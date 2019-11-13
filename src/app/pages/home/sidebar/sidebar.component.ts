import {Component, Input, OnInit} from '@angular/core';
import {GraphqlModule} from '../../../graphql-module/graphql-module.module';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  blocks: any = [];
  @Input() region: string;
  @Input() path: string;

  constructor(private graphql: GraphqlModule) {
  }

  loadBlocks(path: string, region: string) {
    if (!path || !region) {
      return;
    }
    const params: Object = {
      path: path,
      region: region
    };
    let parametric = '';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        parametric += key + params[key];
      }
    }

    const OperationName = 'getBlocks';
    this.graphql.getQueryResult(OperationName, parametric, params)
      .subscribe(result => {
        // @todo: cache empty blocks!
        if (result.fromCache) {
          this.blocks = result.data;
          return;
        }

        if (!(result.data.route && result.data.route.blocksByRegion)) {
          // cache empty response to avoid calling again
          this.graphql.cacheQueryResult(OperationName, parametric.concat('0'), {}, {});
          return;
        }

        this.blocks = result.data.route.blocksByRegion;
        if (result.data.route.blocksByRegion && !result.fromCache) {
          let index = 0;
          for (const key in this.blocks) {
            if (!this.blocks[key].body) {
              continue;
            }
            this.blocks[key].body.value = this.formatHTML(this.blocks[key].body.value);
            this.graphql.cacheQueryResult(OperationName, parametric.concat(index.toString()), {}, this.blocks[key]);
            index++;
          }
        }
      });
  }

  formatHTML(source: string) {
    const replacement = 'src="'.concat(environment.backend_endpoint);
    return source.replace('src="', replacement);
  }

  ngOnInit() {
    this.loadBlocks(this.path, this.region);
  }

}
