<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreToolsSectionRequest;
use App\Http\Requests\UpdateToolsSectionRequest;
use App\Models\Categories;
use App\Models\ToolsSection;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ToolsSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ToolSection/Index', [
            'toolSections' => ToolsSection::paginate(10)
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
    public function store(StoreToolsSectionRequest $request)
    {
        try {
            DB::beginTransaction();
            $category_param = [
                'user_id' => Auth::user()->id,
                'name' => $request->section,
                'slug' => Str::slug($request->section, '_')
            ];

            ToolsSection::create($category_param);
            DB::commit();

            return redirect()->route('tool_sections.tool_section')->with('success', 'Section created successfully.');
        } catch (QueryException $queryException) {
            dd($queryException);
            DB::rollBack();
            return redirect()->route('tool_sections.tool_section')->with('error', $queryException->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ToolsSection $toolsSection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ToolsSection $toolsSection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateToolsSectionRequest $request, ToolsSection $toolsSection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ToolsSection $toolsSection)
    {
        //
    }
}
