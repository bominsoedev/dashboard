<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Tag;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Tags/Index', [
            'tags' => Tag::orderBy('id', 'DESC')->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        try {
            DB::beginTransaction();
            $category_param = [
                'user_id' => Auth::user()->id,
                'name' => $request->tag,
                'slug' => Str::slug($request->tag, '_')
            ];

            Tag::create($category_param);
            DB::commit();

            return redirect()->route('tags.tag')->with('success', 'Category created successfully.');
        } catch (QueryException $queryException) {
            DB::rollBack();
            return redirect()->route('tags.tag')->with('error', $queryException->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        //
    }
}
