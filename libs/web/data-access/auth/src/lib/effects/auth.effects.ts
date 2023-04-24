import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  CheckEmailAvailableAction,
  LoginAction,
  LogoutAction,
  RegisterAction,
  ResetPasswordAction,
} from '@md/web/common/store';
import { AuthService } from '../service/auth.service';
import { EmailAvailableDto, LoginDto, RegisterDto, ResetPasswordDto } from '@md/common/models';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);

  loadLogins$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginAction.load),
      concatMap(({ email, isRememberMeChecked, password }: LoginDto) =>
        this.authService.login({ email, password, isRememberMeChecked }).pipe(
          map((result) => LoginAction.success(result.data)),
          catchError((error) => of(LoginAction.failure({ error })))
        )
      )
    );
  });

  loadRegister$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegisterAction.load),
      concatMap(({ email, password }: RegisterDto) =>
        this.authService.register({ email, password }).pipe(
          map(() => RegisterAction.success()),
          catchError((error) => of(RegisterAction.failure({ error })))
        )
      )
    );
  });

  loadLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LogoutAction.load),
      concatMap(() =>
        this.authService.logout().pipe(
          map(() => LogoutAction.success()),
          catchError((error) => of(LogoutAction.failure({ error })))
        )
      )
    );
  });

  loadResetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResetPasswordAction.load),
      concatMap(({ email }: ResetPasswordDto) =>
        this.authService.resetPassword({ email }).pipe(
          map(() => ResetPasswordAction.success()),
          catchError((error) => of(ResetPasswordAction.failure({ error })))
        )
      )
    );
  });

  loadCheckEmailAvailable$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CheckEmailAvailableAction.load),
      concatMap(({ email }: EmailAvailableDto) =>
        this.authService.checkEmailAvailable({ email }).pipe(
          map((result) => CheckEmailAvailableAction.success({ isAvailable: result.data })),
          catchError((error) => of(CheckEmailAvailableAction.failure({ error })))
        )
      )
    );
  });
}
