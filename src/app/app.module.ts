import { ALL_SERVICES } from './services/services';
import { environment } from './../environments/environment';
import { routing } from './app.routes';
import { AppComponent } from './components/app/app';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {
    CoreModule,
    ConfigurationService,
    StartupService,
    LanguageService,
    TranslationService,
} from '@xnoname/web-components';
import { ALL_COMPONENTS } from './components/components';
import { ALL_PIPES } from './pipes/pipes';
import { NgxElectronModule } from 'ngx-electron';
import { ALL_DIRECTIVES } from './directives/directives';

export function startupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load(environment.configuration);
}

@NgModule({
    declarations: [
        AppComponent,
        ...ALL_COMPONENTS,
        ...ALL_PIPES,
        ...ALL_DIRECTIVES,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        CoreModule,
        routing,
        NgxElectronModule,
    ],
    providers: [
        ConfigurationService,
        LanguageService,
        TranslationService,
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: startupServiceFactory,
            deps: [StartupService],
            multi: true
        },
        ALL_SERVICES,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
