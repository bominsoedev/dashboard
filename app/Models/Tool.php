<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Tool extends Model
{
    use HasFactory;

    protected $table = 'tools';
    protected $fillable = [
        'toolKey',
        'user_id',
        'title',
        'slug',
        'tools_section_id',
        'content'
    ];
    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->toolKey = Str::uuid();
        });
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(ToolsSection::class,'tools_section_id','id');
    }
}
