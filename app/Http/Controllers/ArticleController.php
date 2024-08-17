<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use App\Models\Categories;
use App\Models\Attachment;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
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
            'articles' => Article::paginate(10)
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
    public function store(StoreArticleRequest $request, Article $article, Attachment $attachment): RedirectResponse
    {
        try {
            DB::beginTransaction();

            // Prepare article parameters
            $articleParams = [
                'user_id' => Auth::id(),
                'category_id' => $request->category_id,
                'title' => $request->title,
                'slug' => Str::slug($request->title, '_'),
                'excerpt' => Str::words($request->body, 30, '.....'),
                'content' => $request->body,
            ];

            // Create the article
            $createdArticle = $article->create($articleParams);

            // Handle attachments
            $result = $this->handleAttachment($request, $createdArticle, $attachment);

            // Check the result and commit the transaction if everything is successful
            if ($result === 'success') {
                DB::commit();
                return redirect()->route('article.index')->with('success', 'Article created successfully.');
            }

            // If the result isn't successful, rollback the transaction
            DB::rollBack();
            return redirect()->route('article.index')->with('error', 'Failed to create the article.');

        } catch (QueryException $exception) {
            DB::rollBack();

            // Log the exception with more context
            Log::error('Failed to create article: ', [
                'error' => $exception->getMessage(),
                'user_id' => Auth::id(),
                'request_data' => $request->all(),
            ]);

            return redirect()->route('article.index')->with('error',
                'Article creation failed due to a database error.');
        } catch (\Exception $exception) {

            DB::rollBack();

            // Log the exception for any other unexpected errors
            Log::error('Unexpected error occurred while creating article: ', [
                'error' => $exception->getMessage(),
                'user_id' => Auth::id(),
                'request_data' => $request->all(),
            ]);

            return redirect()->route('article.index')->with('error', 'An unexpected error occurred.');
        }
    }

    public function handleAttachment($request, $article, $attachment): string
    {
        // Validate the request to ensure 'attachments' is a file
        $request->validate([
            'attachments' => 'required|file|mimes:jpg,jpeg,png,gif|max:5120', // Adjust file types and size as needed
        ]);

        if ($request->hasFile('attachments')) {
            $file = $request->file('attachments');

            // Define dynamic storage path based on article ID
            $path = 'photos/articles/'.$article->articleKey;
            // Store the file and get the storage path
            $storedFilePath = $file->store($path, 'public');

            // Prepare attachment parameters
            $attachmentData = [
                'user_id' => Auth::id(),
                'article_id' => $article->id,
                'image_name' => $file->getClientOriginalName(),
                'image_path' => $path,
                'image_location' => $storedFilePath,
            ];

            // Create the attachment record in the database
            $attachment->create($attachmentData);

            return 'success';
        }

        // Return an error message or throw an exception if the file was not provided
        return 'No file attached';
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return Inertia::render('Article', [
            'article' => $article
        ]);
    }

    /**
     * Admin Display the specified resource.
     */
    public function admin_show(Article $article)
    {
        return Inertia::render('AdminArticle', [
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
    public function destroy(Article $article): RedirectResponse
    {
        try {
            DB::beginTransaction();

            // Perform the delete operation
            $article->delete();

            DB::commit();

            return redirect()->route('article.index')->with('success', 'Article deleted successfully.');

        } catch (QueryException $exception) {
            DB::rollBack();

            // Log the exception for debugging purposes
            Log::error('Failed to delete article: ', [
                'error' => $exception->getMessage(),
                'article_id' => $article->id,
                'user_id' => auth()->id(),
            ]);

            return redirect()->route('article.index')->with('error',
                'Failed to delete the article due to a database error.');
        } catch (\Exception $exception) {
            DB::rollBack();

            // Log any unexpected errors
            Log::error('Unexpected error occurred while deleting article: ', [
                'error' => $exception->getMessage(),
                'article_id' => $article->id,
                'user_id' => auth()->id(),
            ]);

            return redirect()->route('article.index')->with('error', 'An unexpected error occurred.');
        }
    }
}
