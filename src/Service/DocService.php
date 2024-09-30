<?php

namespace App\Service;

use Exception;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\TemplateProcessor;
use PhpOffice\PhpWord\IOFactory;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\ConventionTypeGlobalField;
use setasign\Fpdi\Fpdi;
use ZipArchive;


class DocService
{
    public function __construct(
        // private readonly string $img_dir
    ) {}

    function accent2ascii(string $str, string $charset = 'utf-8')
    {
        $str = htmlentities($str, ENT_NOQUOTES, $charset);
        $str = preg_replace('#&([A-za-z])(?:acute|cedil|caron|circ|grave|orn|ring|slash|th|tilde|uml);#', '\1', $str);
        $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str); // pour les ligatures e.g. '&oelig;'
        $str = preg_replace('#&[^;]+;#', '', $str); // supprime les autres caractères
        return $str;
    }

    public function removeFileAccents($filename): string
    {
        $unwanted_array = array(
            'Š' => 'S',
            'š' => 's',
            'Ž' => 'Z',
            'ž' => 'z',
            'À' => 'A',
            'Á' => 'A',
            'Â' => 'A',
            'Ã' => 'A',
            'Ä' => 'A',
            'Å' => 'A',
            'Æ' => 'A',
            'Ç' => 'C',
            'È' => 'E',
            'É' => 'E',
            'Ê' => 'E',
            'Ë' => 'E',
            'Ì' => 'I',
            'Í' => 'I',
            'Î' => 'I',
            'Ï' => 'I',
            'Ñ' => 'N',
            'Ò' => 'O',
            'Ó' => 'O',
            'Ô' => 'O',
            'Õ' => 'O',
            'Ö' => 'O',
            'Ø' => 'O',
            'Ù' => 'U',
            'Ú' => 'U',
            'Û' => 'U',
            'Ü' => 'U',
            'Ý' => 'Y',
            'Þ' => 'B',
            'ß' => 'Ss',
            'à' => 'a',
            'á' => 'a',
            'â' => 'a',
            'ã' => 'a',
            'ä' => 'a',
            'å' => 'a',
            'æ' => 'a',
            'ç' => 'c',
            'è' => 'e',
            'é' => 'e',
            'ê' => 'e',
            'ë' => 'e',
            'ì' => 'i',
            'í' => 'i',
            'î' => 'i',
            'ï' => 'i',
            'ð' => 'o',
            'ñ' => 'n',
            'ò' => 'o',
            'ó' => 'o',
            'ô' => 'o',
            'õ' => 'o',
            'ö' => 'o',
            'ø' => 'o',
            'ù' => 'u',
            'ú' => 'u',
            'û' => 'u',
            'ý' => 'y',
            'þ' => 'b',
            'ÿ' => 'y'
        );
        return strtr($filename, $unwanted_array);
    }

    public function replacePDF(string $filePath, array $fields, array $blocsToRemove = [])
    {

        $tmpFilePath = '/tmp/' . md5(uniqid()) . '.docx';
        file_put_contents($tmpFilePath, $this->deleteBlocks($filePath, $blocsToRemove));
        file_put_contents($tmpFilePath, $this->replace($tmpFilePath, $fields));
        try {
            $res = $this->convertToPDF($tmpFilePath);
            unlink($tmpFilePath);
            return $res;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function replace(string $sourcePath, array $fields)
    {
        $tmpFilePath = '/tmp/' . md5(uniqid()) . '.docx';
        $templateProcessor = new TemplateProcessor($sourcePath);
        foreach ($fields as $field) {
            ['value' => $value, 'type' => $type, 'tag' => $tag] = $field;
            if ($type === 'image' && is_file('/tmp/' . $value)) {
                $templateProcessor->setImageValue($tag, ['path' => '/tmp/' . $value, 'width' => $field['width'], 'height' => 10000000]);
            } else {
                $templateProcessor->setValue($tag, $value);
            }
        }
        $templateProcessor->saveAs($tmpFilePath);
        $res = file_get_contents($tmpFilePath);
        unlink($tmpFilePath);
        return $res;
    }

    public function deleteBlocks(string $sourcePath, array $blocks)
    {
        $docContent = $this->readDocx($sourcePath);
        $templateProcessor = new TemplateProcessor($sourcePath);
        foreach ($blocks as $block) {

            $nbOcc = substr_count($docContent, "\${" . $block . "}");
            for ($i = 0; $i < $nbOcc; $i++) {
                $templateProcessor->cloneBlock($block, 0);
            }
        }
        $tmpFilePath = '/tmp/' . md5(uniqid()) . '.docx';
        $templateProcessor->saveAs($tmpFilePath);
        $res = file_get_contents($tmpFilePath);
        unlink($tmpFilePath);
        return $res;
    }

    public function createFile(string $content, string $path)
    {
        file_put_contents($path, $content);
    }

    public function convertToPDF(string $filepath)
    {
        $output = null;
        $res = null;
        //TODO = > timeout
        exec("unoconv -f pdf '" . $filepath . "' 2>&1", $output, $res);
        if (!empty($output) && !is_file($filepath)) {
            throw new Exception('Erreur lors de la conversion en PDF : ' . implode('/n', $output));
        }
        $pdf_filename = substr($filepath, 0, strpos($filepath, '.')) . '.pdf';
        $res = file_get_contents($pdf_filename);
        unlink($pdf_filename);
        return $res;
    }


    public function addHeader(string $content): string|false
    {
        $tmpFile = '/tmp/' . md5(uniqid());
        file_put_contents($tmpFile, $content);
        $phpWord = new PhpWord();
        $phpWord = IOFactory::load($tmpFile);
        $sections = $phpWord->getSections();
        foreach ($sections as $section) {

            $headers = $section->getFooters();
            foreach ($headers as $header) {
                $header->addText('TEST');
            }
        }

        $objWriter = IOFactory::createWriter($phpWord, 'Word2007');
        $objWriter->save('test-modify-head.docx', 'docx');
        return file_get_contents($tmpFile);
    }

    function readDocx($filename)
    {

        $zip = new ZipArchive();
        if ($zip->open($filename)) {
            $content = $zip->getFromName("word/document.xml");
            $zip->close();
            $content = str_replace('</w:r></w:p></w:tc><w:tc>', " ", $content);
            $content = str_replace('</w:r></w:p>', "\r\n", $content);

            return strip_tags($content);
        }
        return false;
    }
}
