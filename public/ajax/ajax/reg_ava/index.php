<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

file_put_contents('../_logs/file.json', json_encode($_FILES), FILE_APPEND);

$arFile = '';

if($_FILES['file']){

    $fileId = CFile::SaveFile($_FILES['file'], '/main');

    $arFile = CFile::MakeFileArray ($fileId);

    file_put_contents('../_logs/file_id.json', json_encode(CFile::GetPath($fileId)), FILE_APPEND);

    if($arFile) {
        echo json_encode(['status' => 'ok','link' => CFile::GetPath($fileId)]);
    } else {
        echo json_encode(['status' => 'error']);
    }
}