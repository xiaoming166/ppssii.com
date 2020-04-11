<?php


namespace App\Services;

use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

class MailService extends BaseService
{
    /**
     * 发送邮件
     * @param array $data
     * @return bool
     */
    public static function sendMail($data = [])
    {
        $format       = !empty($data['format']) && in_array($data['format'], ['raw', 'html', 'text']) ? $data['format'] : 'raw';
        $to           = is_array($data['to']) ? $data['to'] : [$data['to']];
        $to           = array_filter($to, function ($t) {
            return !empty($t);
        });
        $subject      = $data['subject'];
        $data['data'] = !isset($data['data']) ? [] : $data['data'];
        $attachments  = '';
        if (!empty($data['attachments'])) {
            $attachments = is_array($data['attachments']) ? $data['attachments'] : [$data['attachments']];
        }

        try {
            Mail::send([$format => $data['body']], $data['data'], function (Message $message) use ($subject, $to, $attachments) {
                $message->to(array_unique($to))
                    ->subject($subject);
                if ($attachments) {
                    foreach ($attachments as $attachment) {
                        $message->attach($attachment);
                    }
                }
            });
            if (Mail::failures()) {
                throw new \Exception('下列地址发送失败：' . json_encode(Mail::failures()));
            }
        } catch (\Exception $e) {

        }
        return true;
    }
}
