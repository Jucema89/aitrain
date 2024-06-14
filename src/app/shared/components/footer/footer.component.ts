import { Component } from '@angular/core';
import { LogoAitrainComponent } from "../logo-aitrain/logo-aitrain.component";
import { CreatorCardComponent } from "../creator-card/creator-card.component";

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    imports: [LogoAitrainComponent, CreatorCardComponent]
})
export class FooterComponent {

}
