import { Component, OnInit, TemplateRef } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { DefaultLangChangeEvent, LangChangeEvent, TranslateService, TranslationChangeEvent } from '@ngx-translate/core'
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service'
import { EnvConfig } from 'src/app/core/config/env-config'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    protected envConfig!: EnvConfig
    config$: Observable<EnvConfig> = this.envService.config$

    title = 'my-app-docker'
    param = { value: 'world' }

    modalRef?: BsModalRef
    selectedGender = 'male'
    itemQuantity = '1'

    selectedCar!: number

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ]

    constructor(
        protected envService: EnvironmentLoaderService,
        private modalService: BsModalService,
        public translate: TranslateService
    ) {}

    ngOnInit(): void {
        this.envConfig = this.envService.get()
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template)
    }
}
