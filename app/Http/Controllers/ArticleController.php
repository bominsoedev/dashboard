<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use App\Models\Categories;
use App\Models\Attachment;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Article/Index', [
            'articles' => Article::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Article/Create', [
            'categories' => Categories::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request, Article $article, Attachment $attachment)
    {
        try {
            DB::beginTransaction();

            $article_Param = [
                'user_id' => Auth::id(),
                'category_id' => $request->get('category_id'),
                'title' => $request->input('title'),
                'slug' => Str::slug($request->input('title'), '_'),
                'excerpt' => Str::words($request->input('body'), 30, '.....'),
                'content' => $request->input('body'),
            ];
            $articleStore = $article->create($article_Param);
            $this->extracted($request, $articleStore, $attachment);
            DB::commit();

            return redirect()->route('article.index')->with('success', 'Article created successfully.');
        } catch (QueryException $exception) {
            dd($exception);
            DB::rollBack();

            Log::error('Failed to create provider: ', [
                'error' => $exception->getMessage(),
                'user_id' => Auth::id(),
                'request' => $request->all(),
            ]);

            return redirect()->route('article.index')->with('error', 'Article already exists.');
        }
    }

    public function extracted($request, $article, $attachment): string
    {
        if ($request->hasFile('attachments')) {
            $file = $request->file('attachments');
            $path = 'Featured/Photo/';
            $image = $file->store('photos', 'public'); // Store in 'public/photos'
            $attachment_param = [
                'user_id' => Auth::id(),
                'article_id' => $article->id,
                'image_name' => str_replace($path, "", $image),
                'image_path' => $path,
                'image_location' => $image,
            ];
            $attachment->create($attachment_param);
        }
        return 'success';
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return Inertia::render('Article',[
            'article' => $article
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
