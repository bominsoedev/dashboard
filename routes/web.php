<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ToolController;
use App\Http\Controllers\ToolsSectionController;
use App\Models\Article;
use App\Models\Categories;
use App\Models\Tool;
use App\Models\ToolsSection;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'articles' => Article::all()
    ]);
})->name('welcome');
Route::get('article_list', function () {
    return Inertia::render('ArticleList', [
        'articles' => Article::orderBy('id', 'desc')->get()
    ]);
})->name('articles.article_list');

Route::post('/markdown', fn() => Str::of(request('markdown'))->markdown())->name('markdown');
Route::get('/about', fn() => Inertia::render('About'))->name('about');
Route::get('/uses', function () {
    $grouped = Tool::select('tools.id', 'tools.user_id', 'tools.title', 'tools.content', 'tools.tools_section_id',
        'tools.created_at', 'tools_sections.name')
        ->join('tools_sections', 'tools.tools_section_id', '=', 'tools_sections.id')
        ->get()
        ->groupBy('tools_section_id')
        ->map(function ($items, $tools_section_id) {
            return [
                'sectionId' => $tools_section_id,
                'sectionName' => $items->first()->name,
                'items' => $items->map(function ($item) {
                    return $item;
                })->toArray(),
            ];
        })->values();
    return Inertia::render('Uses', [
        'tools' => $grouped
    ]);
})->name('uses');
Route::get('articles/{article:slug}', [ArticleController::class, 'show'])->name('article.show');


Route::middleware(['auth'])->prefix('session/admin/')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('dashboard', function () {
        // Retrieve counts for each entity
        $startOfMonth = Carbon::now()->startOfMonth();

        // Get the start of the previous month
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        // Get the end of the previous month
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        $tools_currentMonthCount = Tool::where('created_at', '>=', $startOfMonth)->count();
        $tools_lastMonthCount = Tool::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
        $section_currentMonthCount = ToolsSection::where('created_at', '>=', $startOfMonth)->count();
        $section_lastMonthCount = ToolsSection::whereBetween('created_at',
            [$startOfLastMonth, $endOfLastMonth])->count();
        $article_currentMonthCount = Article::where('created_at', '>=', $startOfMonth)->count();
        $article_lastMonthCount = Article::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
        $category_currentMonthCount = Categories::where('created_at', '>=', $startOfMonth)->count();
        $category_lastMonthCount = Categories::whereBetween('created_at',
            [$startOfLastMonth, $endOfLastMonth])->count();


        // Calculate percentage differences
        $articleDiff = $article_lastMonthCount > 0
            ? (($article_currentMonthCount - $article_lastMonthCount) / $article_lastMonthCount) * 100
            : 100;
        $toolDiff = $tools_lastMonthCount > 0
            ? (($tools_currentMonthCount - $tools_lastMonthCount) / $tools_lastMonthCount) * 100
            : 100;
        $sectionDiff = $section_lastMonthCount > 0
            ? (($section_currentMonthCount - $section_lastMonthCount) / $section_lastMonthCount) * 100
            : 100;
        $categoryDiff = $category_lastMonthCount > 0
            ? (($category_currentMonthCount - $category_lastMonthCount) / $category_lastMonthCount) * 100
            : 100;

        // Create the response structure
        $data = [
            [
                'title' => 'Article',
                'icon' => 'receipt', // Replace with actual icon logic
                'total' => $tools_lastMonthCount,
                'value' => $article_currentMonthCount,
                'diff' => $articleDiff,
            ],
            [
                'title' => 'Tool',
                'icon' => 'receipt', // Replace with actual icon logic
                'total' => $tools_lastMonthCount,
                'value' => $tools_currentMonthCount,
                'diff' => $toolDiff,
            ],
            [
                'title' => 'Category',
                'icon' => 'receipt', // Replace with actual icon logic
                'total' => $category_lastMonthCount,
                'value' => $category_currentMonthCount,
                'diff' => $categoryDiff,
            ],
            [
                'title' => 'Section',
                'icon' => 'receipt', // Replace with actual icon logic
                'total' => $section_lastMonthCount,
                'value' => $section_currentMonthCount,
                'diff' => $sectionDiff,
            ],
        ];
        return Inertia::render('Dashboard', [
            'data' => $data
        ]);
    })->name('dashboard');

    //article
    Route::get('articles', [ArticleController::class, 'index'])->name('article.index');
    Route::get('articles/create_article', [ArticleController::class, 'create'])->name('article.create');
    Route::post('articles/create_article', [ArticleController::class, 'store'])->name('articles.create-article');
    Route::get('articles/{article:slug}', [ArticleController::class, 'admin_show'])->name('article.admin_show');
    Route::delete('articles/destroy_article/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy-article');

    //tools
    Route::get('tools', [ToolController::class, 'index'])->name('tool.index');
    Route::get('tools/create_tool', [ToolController::class, 'create'])->name('tool.create');
    Route::post('tools/create_tool', [ToolController::class, 'store'])->name('tools.create-tool');

    //categories
    Route::get('categories/category', [CategoriesController::class, 'index'])->name('categories.category');
    Route::post('categories/create_category',
        [CategoriesController::class, 'store'])->name('categories.create-category');
    Route::post('categories/edit_category/{category}',
        [CategoriesController::class, 'update'])->name('categories.update-category');
    Route::delete('categories/destroy_category/{category}',
        [CategoriesController::class, 'destroy'])->name('categories.destroy-category');

    //categories
    Route::get('tool_sections/tool_section',
        [ToolsSectionController::class, 'index'])->name('tool_sections.tool_section');
    Route::post('tool_sections/create_tool_section',
        [ToolsSectionController::class, 'store'])->name('tool_sections.create-tool_section');
    Route::post('tool_sections/edit_tool_section/{toolsSection}',
        [ToolsSectionController::class, 'update'])->name('tool_sections.update-tool_section');
});

require __DIR__.'/auth.php';
