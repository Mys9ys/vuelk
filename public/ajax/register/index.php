<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

file_put_contents('../_logs/debug_new.json', json_encode($_REQUEST));

$res= new VueRegistrationClass($_REQUEST);

class VueRegistrationClass
{

    protected $regData = [];

    public function __construct($data)
    {
        if ($data) $this->regData = $data;

        $this->userRegistration();
    }

    protected function userRegistration()
    {
        $arIMAGE = CFile::MakeFileArray($_SERVER["DOCUMENT_ROOT"].$this->regData['file']);

        $arrFio = explode(' ', $this->regData['fio']);

        $user = new CUser;
        $arFields = Array(
            "NAME"              => $arrFio[1],
            "LAST_NAME"         => $arrFio[0],
            "EMAIL"             => $this->regData['mail'],
            "LOGIN"             => $this->regData['mail'],
            "LID"               => "ru",
            "ACTIVE"            => "Y",
            "GROUP_ID"          => array(7),
            "PASSWORD"          => $this->regData['pass'],
            "CONFIRM_PASSWORD"  => $this->regData['pass2'],
            "PERSONAL_PHOTO"    => $arIMAGE,
            "PERSONAL_PHONE"    => \NormalizePhone($this->regData["phone"]),
        );

        $ID = $user->Add($arFields);

        var_dump($user->LAST_ERROR);

        var_dump($ID);
    }
}