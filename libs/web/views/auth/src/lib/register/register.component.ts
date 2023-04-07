import { Component } from '@angular/core'
import { RegisterDto } from '@md/common/models'

@Component({
  selector: 'md-register-view',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  handleRegisterSubmit(data: RegisterDto) {
    console.log('handleRegisterSubmit')
  }
}
