<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'tagKey',
        'user_id',
        'name',
        'slug'
    ];
    protected $with = ['user'];
    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->tagKey = Str::uuid();
        });
    }
    public function scopeFilter($query, array $filters)
    {
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) => $query->where(
                fn($query) => $query
                    ->where('name', 'like', '%' . request('search') . '%')
                    ->orWhere('slug', 'like', '%' . request('search') . '%')
            )
        );
    }
    public function photos(): BelongsToMany
    {
        return $this->belongsToMany(Photo::class, 'portfolio_tag');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
