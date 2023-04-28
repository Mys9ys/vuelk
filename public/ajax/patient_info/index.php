<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Loader;
use Bitrix\Main\UserTable;

$_REQUEST['date'] = date(\CDatabase::DateFormatToPHP("DD.MM.YYYY HH:MI:SS"), time());

file_put_contents('../_logs/patient_pass.log', json_encode($_REQUEST) . PHP_EOL, FILE_APPEND);

//$_REQUEST['type'] = 'profile';

if ($_REQUEST) {

    $res = new LKPatientInfo($_REQUEST);

    echo json_encode($res->result());

}

class LKPatientInfo
{

    protected $data;
    protected $userID;

    protected $arResult = [];

    protected $clientsIb;

    protected $arStatus = [];

    protected $arInfo = [];

    protected $arEntity = [
        'DEAL_STAGE',
        'STATUS'
    ];

    protected $failStatus = [
        'apology',
        'failure'
    ];

    protected $arRequestType = [
        'last',
        'list',
        'bonus'
    ];

    protected $arPeriodList = [
        'list',
        'bonus'
    ];

    protected $arVisit = [
        'NEW'
    ];

    protected $arСontract = [
        '17308156', //Аванс
        '18020636', //договор
        '18020638', //начал лечение
        'WON', //завершено
    ];

    protected $arPeriod = [];

    protected $urlCRM = 'https://eurokappa.bitrix24.ru/rest/3644/dbn3cmibyvm30u2i/crm.status.list.json?';

    public function __construct($data)
    {
        if (!Loader::includeModule('iblock')) {
            ShowError('Модуль Информационных блоков не установлен');
            return;
        }

        $this->clientsIb = \CIBlock::GetList([], ['CODE' => 'Klients'], false)->Fetch()['ID'] ?: 4;

        $this->data = $data;

        $this->fillPeriod();

        $requestID = new LKGetUserIdForToken($this->data['token']);

        if ($requestID->result()["id"]) {
            $this->userID = $requestID->result()["id"];

            $this->getStatusArray();

            if ($this->data['type'] === 'profile') {
                $this->getProfileInfo();
                $this->setResult('ok', '', $this->arInfo);
            }

            if(in_array($this->data['type'], $this->arRequestType)){
                $this->getPatientsInfo();
                $this->setResult('ok', '', $this->arInfo);
            }


        } else {
            $this->setResult('error', $requestID->result()["mes"]);
        }

    }

    protected function fillPeriod(){
        $this->arPeriod['week'] = date('Y.m.d', strtotime('-1 week'));
        $this->arPeriod['month'] = date('Y.m.d', strtotime('-1 month'));
        $this->arPeriod['half'] = date('Y.m.d', strtotime('-6 month'));
        $this->arPeriod['year'] = date('Y.m.d', strtotime('-1 year'));
    }

    protected function getProfileInfo()
    {
        // краткая информация для профиля
        $arFilter["IBLOCK_ID"] = $this->clientsIb;
        $arFilter["PROPERTY_USER_ID"] = $this->userID;

        $response = CIBlockElement::GetList(
            [],
            $arFilter,
            false,
            [],
            [
                "ID",
                "DATE_ACTIVE_FROM",
                "PROPERTY_STATUS",
            ]
        );

        while ($res = $response->GetNext()) {
            $res['status'] = $this->arStatus[$res['PROPERTY_STATUS_VALUE']];
            $this->arInfo['count']++;
            if (in_array($res['status']['id'], $this->arСontract)) {
                $this->arInfo['contract']++;
                $this->arInfo['bonus'] += 15;
            }

            if (in_array($res['status']['id'], $this->arVisit)) {
                $this->arInfo['bonus'] += 1;
            }
        }
    }

    protected function getPatientsInfo()
    {
        // вытаскиваем переданных пациентов в зависимости от типа запроса
        $arFilter["IBLOCK_ID"] = $this->clientsIb;
        $arFilter["PROPERTY_USER_ID"] = $this->userID;
        $order["DATE_ACTIVE_FROM"] = 'DESC';

        $reqCount = [];
        if ($this->data['type'] === 'last') {
            $reqCount["nTopCount"] = 4;
        }

        $response = CIBlockElement::GetList(
            $order,
            $arFilter,
            false,
            $reqCount,
            [
                "ID",
                "CREATED_DATE",
                "PROPERTY_STATUS",
                "PROPERTY_NAME",
                "PROPERTY_LAST_NAME",
                "PROPERTY_SECOND_NAME",
            ]
        );

        while ($res = $response->GetNext()) {
            if ($this->arStatus[$res['PROPERTY_STATUS_VALUE']]) {
                $res['status'] = $this->arStatus[$res['PROPERTY_STATUS_VALUE']];

                if(in_array($res['status']['id'], $this->arVisit)){
                    $res['b_status'] = 'Пришел в клинику';
                    $res['bonus'] = 1000;
                }

                if(in_array($res['status']['id'], $this->arСontract)){
                    $res['b_status'] = 'Подписан договор';
                    $res['bonus'] = 15000;
                }

            } else {
                $res['status']['color'] = 'grey';
                $res['status']['name'] = "Не определен";
            }

            $date = explode(".", $res["CREATED_DATE"]);

            $res['date'] =$date[2].'.'.$date[1];

            $res['name'] = '';
            $res['name'] .= $res['PROPERTY_LAST_NAME_VALUE'] ?? '';
            $res['name'] .= ' ' . $res['PROPERTY_NAME_VALUE'] ?? '';
            $res['name'] .= ' ' . $res['PROPERTY_SECOND_NAME_VALUE'] ?? '';

            if (in_array($this->data['type'], $this->arPeriodList)) {

                foreach ($this->arPeriod as $title => $period) {
                    // заполняем массивы по периодам для фильтра на странице
                    if ($res["CREATED_DATE"] > $period) {
                        if($this->data['type'] === 'list'){
                            $this->arInfo[$title][] = $res;
                        }
                        if($this->data['type'] === 'bonus' && $res['bonus']){
                            $this->arInfo[$title][] = $res;
                        }
                    }

                }

                if($this->data['type'] === 'list'){
                    $this->arInfo['all'][] = $res;
                }
                if($this->data['type'] === 'bonus' && $res['bonus']){
                    $this->arInfo['all'][] = $res;
                }

            }else {
                $this->arInfo[] = $res;
            }

        }

        if (in_array($this->data['type'], $this->arPeriodList)) {
            // разбиваем массивы для пагинации
            foreach ($this->arInfo as $title=>$arPeriod){
                $pagination = array_chunk($arPeriod, 5);
                $this->arInfo[$title] = [];

                foreach ($pagination as $num=>$arr){
                    foreach ($arr as $id=>$item){
                        $this->arInfo[$title][$num+1][$item['date']][] = $item;
                    }
                }
            }
        }
    }

    protected function getStatusArray()
    {
        // вытаскиваем все статусы из црм б24
        foreach ($this->arEntity as $item) {
            $curl = $this->urlCRM . 'filter[ENTITY_ID]=' . $item;

            $res = $this->curlResult($curl)["result"];

            foreach ($res as $status) {
                $el = [];
                $el['entity'] = $status['ENTITY_ID'];
                $el['id'] = $status['STATUS_ID'];
                $el['name'] = $status['NAME'];
                if($status['STATUS_ID'] == 21) {
                    $el['name'] = explode('/', $status['NAME'])[0];
                }
                $el['color'] = 'clr' . trim($status['COLOR'], '#');
                $el['stage'] = $status['EXTRA']['SEMANTICS'];

                $this->arStatus[$status['STATUS_ID']] = $el;
            }
        }

    }

    protected function setResult($status, $mes, $info = '')
    {
        $this->arResult['status'] = $status;
        $this->arResult['mes'] = $mes;
        if ($info) $this->arResult['info'] = $info;
    }

    protected function curlResult($queryUrl)
    {
        // запрос к црм б24
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HEADER => 0,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $queryUrl,
        ]);
        $result = curl_exec($curl);
        curl_close($curl);
        return json_decode($result, 1);
    }

    public function result()
    {
        return $this->arResult;
    }

}
