import { Component } from '@angular/core';
import { CreatorCardComponent } from "../creator-card/creator-card.component";
import { LogoAitrainComponent } from "../logo-aitrain/logo-aitrain.component";


@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    imports: [CreatorCardComponent, LogoAitrainComponent]
})
export class FooterComponent {

}
