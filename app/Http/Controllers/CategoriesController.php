<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoriesRequest;
use App\Http\Requests\UpdateCategoriesRequest;
use App\Models\Categories;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Categories/Index', [
            'categories' => Categories::paginate(10)
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
    public function store(StoreCategoriesRequest $request)
    {
        try {
            DB::beginTransaction();
            $category_param = [
                'user_id' => Auth::user()->id,
                'name' => $request->category,
                'slug' => Str::slug($request->category, '_')
            ];

            Categories::create($category_param);
            DB::commit();

            return redirect()->route('categories.category')->with('success', 'Category created successfully.');
        } catch (QueryException $queryException) {
            DB::rollBack();
            return redirect()->route('categories.category')->with('error', $queryException->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Categories $categories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categories $categories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriesRequest $request, Categories $category)
    {
        try {
            DB::beginTransaction();
            $category_param = [
                'user_id' => Auth::user()->id,
                'name' => $request->category,
                'slug' => Str::slug($request->category, '_')
            ];

            $category->update($category_param);
            DB::commit();

            return redirect()->route('categories.category')->with('success', 'Category Update successfully.');
        } catch (QueryException $queryException) {
            DB::rollBack();

            return redirect()->route('categories.category')->with('error', $queryException->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categories $categories)
    {
        dd($categories);
    }
}
