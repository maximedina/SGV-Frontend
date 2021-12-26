import { Component } from '@angular/core';

// Template component
// Use block-ui-template class to center div if desired
@Component({
    template: `
      <!--<div class="block-ui-template">
        <img src="assets/custom_spinner.gif" />
        <p class="block-ui-text">{{message}}</p>
      </div>-->
      <div class="block-ui-template">
        <div class="block-ui-sector block-ui-sector-org1"></div>
        <div class="block-ui-sector block-ui-sector-org2"></div>
        <div class="block-ui-sector block-ui-sector-org3"></div>
        <div class="block-ui-text">{{message}}</div>
      </div>
    `
  })
  export class BlockTemplateCmp {}