<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\UserTable;

$_REQUEST['date'] = date(\CDatabase::DateFormatToPHP("DD.MM.YYYY HH:MI:SS"), time());

file_put_contents('../_logs/register.log', json_encode($_REQUEST) . PHP_EOL, FILE_APPEND);

if($_REQUEST){

    $res= new LKRegistrationClass($_REQUEST);

    echo json_encode($res->result());
}


class LKRegistrationClass
{

    protected $data = [];

    protected $arResult = [];

    public function __construct($data)
    {
        $this->data = $data;

        if($this->data['type'] === 'reg') $this->userRegistration();
        if($this->data['type'] === 'check') $this->checkImportantInput();
    }

    protected function userRegistration()
    {
        $arIMAGE = CFile::MakeFileArray($_SERVER["DOCUMENT_ROOT"].$this->data['file']);

        $arrFio = explode(' ', $this->data['fio']);

        $user = new CUser;
        $arFields = Array(
            "NAME"              => $arrFio[1],
            "LAST_NAME"         => $arrFio[0],
            "EMAIL"             => $this->data['mail'],
            "LOGIN"             => $this->data['mail'],
            "LID"               => "ru",
            "ACTIVE"            => "Y",
            "GROUP_ID"          => array(7),
            "PASSWORD"          => $this->data['pass'],
            "CONFIRM_PASSWORD"  => $this->data['pass2'],
            "PERSONAL_PHOTO"    => $arIMAGE,
            "PERSONAL_PHONE"    => \NormalizePhone($this->data["phone"]),
        );

        $ID = $user->Add($arFields);

        if($user->LAST_ERROR) {
            $this->setResult('error', explode('(', $user->LAST_ERROR)[0] . 'уже существует');
        } else {
            $this->setResult('ok', '');
        }
    }

    protected function checkImportantInput(){

        file_put_contents('../_logs/set_phone.log', \NormalizePhone($this->data["value"]), FILE_APPEND);

        $filter = [];
        $mes = '';
        if($this->data['name'] === 'phone') {
            $filter['=PERSONAL_PHONE'] = \NormalizePhone($this->data["value"]);
            $mes = 'Номер уже используется';
        }

        if($this->data['name'] === 'mail') {
            $filter['=EMAIL'] = $this->data["value"];
            $mes = 'E-mail уже используется';
        }

        $dbUser = UserTable::getList(array(
            'select' => ['ID'],
            'filter' => $filter
        ))->fetch();

        if($dbUser['ID']){
            $this->setResult('error', $mes, $this->data['name']);
        }
    }

    protected function setResult($status,$mes, $name = '')
    {
        $this->arResult['status'] = $status;
        $this->arResult['mes'] = $mes;
        if($name){
            $this->arResult['result'] = [
                'mes' => $mes,
                'name' => $name
            ];
        }
    }

    public function result()
    {
        return $this->arResult;
    }

}