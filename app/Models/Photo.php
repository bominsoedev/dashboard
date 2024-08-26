<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'portfolio_id',
        'image_name',
        'image_path',
        'image_location'
    ];

    public function portfolio(): BelongsTo
    {
        return $this->belongsTo(Portfolio::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'portfolio_tag');
    }

    // Define the scope for filtering by category
    public function scopeFilter($query, array $filter)
    {
        $query->when(
            $filter['tag'] ?? false,
            fn($query, $slug) => $query->whereHas(
                'tags',
                fn($query) => $query->where('slug', $slug)
            )
        );
//        return $query->whereHas('tags', function($q) use ($filter) {
//            $q->whereIn('tags.slug', $filter);
//        });
    }
}
