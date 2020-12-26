@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Login') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Login') }}
                                </button>

                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>



{{-- <div id="LoginModal" class="modal">
    <!-- Modal Content -->
    <form action="http://www.roniko.ge/ka/api/login" method="POST" class="modal-content animate" id='loginForm' autocomplete="on">
        @csrf
        <span onclick="document.getElementById('LoginModal').style.display='none'" class="close" title="Close Modal">&times;</span>
        <div class="modal-inner-content">
            <p class="login-description">ავტორიზაცია სოციალური ქსელის მეშვეობით</p>
            <ul class="social-login">
                <li><a href="http://www.roniko.ge/facebook/authorize"><img src="http://www.roniko.ge/Public/images/facebook.png"></a></li>
                <li><a href="http://www.roniko.ge/google/authorize"><img src="http://www.roniko.ge/Public/images/google.png"></a></li>
            </ul>
            <span id="add-seperator" class="or-seperator"><em>ან</em></span>
            <div class="auth-content">
                <div class="Input">
                    <i class="icon icon-username"></i>
                    <input type="text" name="login_username" placeholder="ელ.ფოსტა">
                </div>
                <div class="Input">
                    <i class="icon icon-password"></i>
                    <input type="password" name="login_password" placeholder="პაროლი">
                </div>
                <div class="Input-footer2">
                    <div class="filter-checkbox">
                        <input id="remember" type="checkbox" name="remember" value="1">
                        <label for="remember">მომხმარებლის დამახსოვრება</label>
                    </div>
                    <a href="http://www.roniko.ge/forgot-password">პაროლის აღდგენა</a>
                </div>
                <div class="Input-footer">
                    <button id="ButtonLogin" class='ButtonLogin' type="submit" data-loading-text="იტვირთება...">შესვლა</button>
                    <a href="http://www.roniko.ge/register">რეგისტრაცია</a>
                </div>
            </div>
        </div>
    </form>
</div> --}}

@endsection
