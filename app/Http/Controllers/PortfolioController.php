<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePortfolioRequest;
use App\Http\Requests\UpdatePortfolioRequest;
use App\Models\Portfolio;
use App\Models\PortfolioTag;
use App\Models\Tag;
use Auth;
use DB;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $portfolios = Portfolio::with('photos.tags')->paginate();
        return Inertia::render('Portfolio/Index', [
            'portfolios' => $portfolios
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tags = Tag::all();
        return Inertia::render('Portfolio/Create', [
            'tags' => $tags
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePortfolioRequest $request)
    {
        try {
            DB::beginTransaction();

            // Validate the request
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'tag_id' => 'required|exists:tags,id',
                'attachments' => 'required|array',
                'attachments.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            ]);

            $portfolio = Portfolio::create([
                'title' => $request->title,
                'user_id' => Auth::user()->id,
            ]);

            $path = 'photos/portfolio/';

            foreach ($request->file('attachments') as $file) {
                // Store the image
                $image = $file->store($path, 'public');
                $photoModel = $portfolio->photos()->create([
                    'user_id' => Auth::user()->id,
                    'image_location' => $image,
                    'image_name' => str_replace($path, "", $image),
                    'image_path' => $path,
                ]);
                if ($request->has('tag_id')) {
                    $photoModel->tags()->sync($request->input('tag_id'), true);
                }
            }

            DB::commit();
            return redirect()->route('portfolios.portfolio')->with('success', 'Portfolio created successfully.');
        } catch (ValidationException $e) {
            dd($e);
            DB::rollBack();

            return redirect()->route('portfolios.portfolio')
                ->withErrors($e->validator)
                ->withInput();
        } catch (QueryException $e) {
            dd($e);
            DB::rollBack();

            return redirect()->route('portfolios.portfolio')->with('error',
                'Portfolio creation failed due to a database error.');
        } catch (Exception $e) {
            dd($e->getMessage());
            DB::rollBack();

            return redirect()->route('portfolios.portfolio')->with('error', 'An unexpected error occurred.');
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Portfolio $portfolio)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Portfolio $portfolio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePortfolioRequest $request, Portfolio $portfolio)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Portfolio $portfolio)
    {
        //
    }
}
