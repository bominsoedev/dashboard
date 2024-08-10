<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $with = [
        'user',
        'category',
        'attachment'
    ];
    protected $fillable = [
        'articleKey',
        'user_id',
        'category_id',
        'attachment_id',
        'title',
        'slug',
        'excerpt',
        'content',
    ];
    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->articleKey = Str::uuid();
        });
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Categories::class);
    }

    public function attachment(): BelongsTo
    {
        return $this->belongsTo(Attachment::class);
    }
}
