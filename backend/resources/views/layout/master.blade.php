<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>E-commerce</title>

    <link rel="stylesheet" href="{{ asset('style/global.css') }}">   
    <link rel="stylesheet" href="{{ asset('style/header.css') }}">    

    @stack('css')
</head>

<body>
    @include('layout.header')

    @yield('content')
</body>
</html>
