<?php

use Bitrix\Main\Loader;
use Bitrix\Main\UserTable;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

file_put_contents('../_logs/debug_send_patient.json', json_encode($_REQUEST), FILE_APPEND);

$res = new VueSendPatient($_REQUEST);

echo json_encode($res->getStatus());

class VueSendPatient
{

    protected $sendData = [];
    protected $clientsIb = '';
    protected $userId = '';

    protected $arrError = [
        'status' => '',
        'mes' => ''
    ];

    public function __construct($data)
    {
        if (!Loader::includeModule('iblock')) {
            ShowError('Модуль Информационных блоков не установлен');
            return;
        }

        $this->clientsIb = \CIBlock::GetList([], ['CODE' => 'Klients'], false)->Fetch()['ID'] ?: 4;

        $this->sendData = $data;

        $this->getUserIdForToken($this->sendData['token']);

        if ($this->userId) {
            $this->setClientSendData();
            $this->arrError['status'] = 'ok';
        } else {
            $this->arrError['status'] = 'error';
            $this->arrError['mes'] = 'Передача не удалась';
        }

    }

    protected function getUserIdForToken($token)
    {

        $dbUser = UserTable::getList(array(
            'select' => array('ID'),
            'filter' => array('=UF_TOKEN' => $token)
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

        $this->result = $ib->Add($data);

    }

    public function getStatus()
    {
        return $this->arrError;
    }

}
