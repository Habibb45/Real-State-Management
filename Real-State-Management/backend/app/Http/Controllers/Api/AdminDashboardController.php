<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $monthlyRegistrations = User::query()
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as total')
            ->where('created_at', '>=', now()->subMonths(11)->startOfMonth())
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $propertyCategories = Property::query()
            ->selectRaw('property_type, COUNT(*) as total')
            ->groupBy('property_type')
            ->orderBy('property_type')
            ->get();

        return response()->json([
            'stats' => [
                'total_properties' => Property::query()->count(),
                'total_users' => User::query()->count(),
                'available_properties' => Property::query()->where('status', 'available')->count(),
                'sold_or_rented_properties' => Property::query()->whereIn('status', ['sold', 'rented'])->count(),
            ],
            'charts' => [
                'monthly_registrations' => $monthlyRegistrations,
                'property_categories' => $propertyCategories,
            ],
        ]);
    }
}