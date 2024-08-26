<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioTag extends Model
{
    use HasFactory;

    protected $table = 'portfolio_tag';
    protected $fillable = [
        'portfolio_id',
        'tag_id',
    ];

}
