<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class ToolsSection extends Model
{
    use HasFactory;
    protected $with = ['user'];
    protected $fillable = [
        'tools_sectionKey',
        'user_id',
        'name',
        'slug',
    ];
    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->tools_sectionKey = Str::uuid();
        });
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
