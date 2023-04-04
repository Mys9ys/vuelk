<?php

use Bitrix\Main\UserTable;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

//$input_data = json_decode(file_get_contents('php://input'), true);
//file_put_contents('debug_request_new.json', json_encode($input_data));
file_put_contents('debug_new.json', json_encode($_REQUEST));
//
//$input_data = json_decode(file_get_contents('debug_request_new.json'), true);

$auth = new VueAuthClass($_REQUEST);

$response = $auth->getVueResult();

file_put_contents('file.json', json_encode($_FILES));

//var_dump($response);
//
if($response['status'] === 'ok' && $_FILES['file']){

    $fileId = CFile::SaveFile($_FILES['file'], '/main');

    $arFile = CFile::MakeFileArray ($fileId);

    file_put_contents('file_id.json', json_encode(CFile::GetPath($fileId)));

    $auth->setAvaImg($arFile, $_REQUEST['token']);
}

echo json_encode($response);

//CUser::Login(
//    string login,
// string password,
// string remember = "N",
// string password_original = "Y"
//)
//$email = 'a.avdiuk@eurokappa.ru';
//$filter = array("EMAIL" => $email);
//$sql = CUser::GetList(($by = "id"), ($order = "desc"), $filter);
//if ($sql->NavNext(true, "f_")) {
//    $login = $f_LOGIN;
//    echo $login;
//}
//
//$USER = new CUser;
//$arAuthResult = $USER->Login($login, "32Tameda", "Y");
//
//
//echo $arAuthResult;
//
//echo '<br>' . $USER->GetLogin();

class VueAuthClass
{

    protected $login;
    protected $mail;
    protected $pass;
    protected $type;

    protected $token;

    protected $arAuthResult;

    protected $userId;

    protected $userInfo = [];

    protected $error = '';

    public function __construct($data)
    {
        $this->mail = $data['mail'];
        $this->pass = $data['pass'];

        $this->type = $data['type'];
        $this->token = $data['token'];

        if($this->type === 'newLogin') $this->newLogin();
        if($this->type === 'tokenLogin' || $this->type === 'ava') $this->tokenLogin();
        if(!$this->type) $this->error = 'Ошибка авторизации';

    }

    protected function newLogin(){

        $this->getUserLogin();

        if(!$this->login) {
            $this->error = 'Пользователь не найден';
        } else {
            $this->setAuthorization();
            if($this->arAuthResult["MESSAGE"]) {
                $this->error = trim($this->arAuthResult["MESSAGE"], '<br>');
            } else {
                $this->genToken();

                if($this->setToken()) {
                    $this->loadUserInfo();


                } else {
                    $this->error = 'Ошибка! Попробуйте еще раз.';
                }
            }
        }
    }

    protected function tokenLogin(){

        $this->checkToken();
        if(!$this->login) {
            $this->error = 'Токен не верный';
        } else {
            $this->loadUserInfo();
        }
    }

    protected function getUserLogin()
    {
        $dbUser = UserTable::getList(array(
            'select' => array('LOGIN', 'ID'),
            'filter' => array('=EMAIL' => $this->mail)
        ))->fetch();
        $this->login = $dbUser["LOGIN"];
        $this->userId = $dbUser["ID"];
    }

    protected function setAuthorization()
    {
        $USER = new CUser;
        $this->arAuthResult = $USER->Login(
            $this->login,
            $this->pass,
            "Y"
        );

    }

    public function checkToken(){

        $dbUser = UserTable::getList(array(
            'select' => array('LOGIN'),
            'filter' => array('=UF_TOKEN' => $this->token)
        ))->fetch();

        $this->login = $dbUser['LOGIN'];

    }

    protected function getUserIdForToken($token){

        $dbUser = UserTable::getList(array(
            'select' => array('ID'),
            'filter' => array('=UF_TOKEN' => $token)
        ))->fetch();

        $this->userId = $dbUser['ID'];
    }

    public function setAvaImg($arr, $token){

        $this->getUserIdForToken($token);

        $user = new CUser;
        $fields = array(
            "PERSONAL_PHOTO" => $arr,
        );

        $user->Update($this->userId, $fields);
    }

    protected function loadUserInfo()
    {
        $dbUser = UserTable::getList(array(
            'select' => array('ID', 'EMAIL', 'PERSONAL_PHONE', 'UF_TOKEN', 'NAME', 'LAST_NAME', 'PERSONAL_PHOTO'),
            'filter' => array('=LOGIN' => $this->login)
        ))->fetch();
        $dbUser['ava'] = $this->imageFormat($dbUser['PERSONAL_PHOTO'], 105, 105, 90);
        unset($dbUser['PERSONAL_PHOTO']);
        $this->userInfo = $dbUser;
    }

    /**
     * @return array
     */
    public function getVueResult(): array
    {

        $res = [];
        if($this->error) {
            $res['status'] = 'error';
            $res['mes'] = $this->error;
        } else {
            $res['status'] = 'ok';
            $res['info'] = $this->userInfo;
        }
        return $res;
    }

    protected function setToken(){

        $user = new CUser;
        $fields = array(
            "UF_TOKEN" => $this->token,
        );
        return $user->Update($this->userId, $fields);

    }

    protected function genToken(){

        $token = random_bytes(16);
        $this->token = implode('-', str_split(bin2hex($token), 4));

    }

    protected function imageFormat($id, $width, $height, $jpgQuality)
    {

        $arFileTmp = CFile::ResizeImageGet(
            $id,
            array("width" => $width, "height" => $height),
            BX_RESIZE_IMAGE_PROPORTIONAL,
            true,
            array(
                "name" => "sharpen",
                "precision" => 15
            ),
            false,
            $jpgQuality
        );
        return $arFileTmp["src"];
    }

}
