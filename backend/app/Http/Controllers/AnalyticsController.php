<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\AnalyticsRepository;

class AnalyticsController extends Controller
{

    public function __construct(AnalyticsRepository $analyticsRepository)
    {
        $this->analyticsRepository = $analyticsRepository;
    }

    public function getMyAnalytics()
    {
        return response()->json($this->analyticsRepository->getMyAnalytics());
    }
}