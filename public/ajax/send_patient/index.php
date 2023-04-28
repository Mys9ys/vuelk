<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Loader;
use Bitrix\Main\UserTable;

$_REQUEST['date'] = date(\CDatabase::DateFormatToPHP("DD.MM.YYYY HH:MI:SS"), time());

file_put_contents('../_logs/send_patient.log', json_encode($_REQUEST) . PHP_EOL, FILE_APPEND);

if($_REQUEST){
    $res = new LKSendPatient($_REQUEST);

    echo json_encode($res->result());
}

class LKSendPatient
{

    protected $clientsIb = '';
    protected $userId = '';

    protected $sendData = [];

    protected $arResult = [];

    public function __construct($data)
    {
        if (!Loader::includeModule('iblock')) {
            ShowError('Модуль Информационных блоков не установлен');
            return;
        }

        $this->clientsIb = \CIBlock::GetList([], ['CODE' => 'Klients'], false)->Fetch()['ID'] ?: 4;

        $this->sendData = $data;

        $this->getUserIdForToken();

        if ($this->userId) {
            $this->setClientSendData();
            $this->setResult('ok', '');
        } else {
            $this->setResult('error', 'Ошибка авторизации');
        }

    }

    protected function getUserIdForToken()
    {
        $dbUser = UserTable::getList(array(
            'select' => array('ID'),
            'filter' => array('=UF_TOKEN' => $this->sendData['token'])
        ))->fetch();

        $this->userId = $dbUser['ID'];
    }

    protected function setClientSendData()
    {

        $now = date(\CDatabase::DateFormatToPHP("DD.MM.YYYY"), time());

        $PROP = [
            3 => $this->sendData["family"],
            4 => $this->sendData["name"],
            5 => $this->sendData["fatherstvo"],
            6 => \NormalizePhone($this->sendData["phone"]),
            7 => $this->userId,
            8 => ["VALUE" => $now],
            "type" => $this->sendData["type"],
            "doctor" => 'Клиент передан врачом: ' . $this->sendData["doctor_family"] . ' ' .
                $this->sendData["doctor_name"] . '. Контактный номер: +' . $this->sendData["doctor_phone"]
        ];

        $ib = new CIBlockElement;
        $data = [
            "IBLOCK_ID" => $this->clientsIb,
            'DATE_ACTIVE_FROM' => $now,
            "PROPERTY_VALUES" => $PROP,
        ];

        // Закидываем в существующий костыль /local/php_interface/init.php
        $name = new iblockForms();
        $name->OnAfterIBlockElementAddHandler($data);
        $name->OnBeforeIBlockElementAddHandler($data);

        if($ib->Add($data)){
            $this->setResult('ok', '');
        } else {
            $this->setResult('error', 'Передача не удалась');
        }

    }

    protected function setResult($status,$mes)
    {
        $this->arResult['status'] = $status;
        $this->arResult['mes'] = $mes;
    }

    public function result()
    {
        return $this->arResult;
    }

}
