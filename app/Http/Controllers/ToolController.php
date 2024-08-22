<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreToolRequest;
use App\Http\Requests\UpdateToolRequest;
use App\Models\Tool;
use App\Models\ToolsSection;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ToolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Tool/Index', [
            'tools' => Tool::orderBy('id', 'desc')->paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tool/Create', [
            'sections' => ToolsSection::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreToolRequest $request)
    {
        try {
            DB::beginTransaction();

            $tool_param = [
                'user_id' => Auth::user()->id,
                'title' => $request->title,
                'slug' => Str::slug($request->title, '_'),
                'content' => $request->body,
                'tools_section_id' => $request->tools_section_id
            ];

            Tool::create($tool_param);
            DB::commit();

            return redirect()->route('tool.index')->with('success', 'Created Tool Successfully.');
        } catch (QueryException $queryException) {
            DB::rollBack();

            return redirect()->route('tool.index')->with('success', 'Created Tool Successfully.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Tool $tool)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tool $tool)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateToolRequest $request, Tool $tool)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tool $tool)
    {
        //
    }
}
