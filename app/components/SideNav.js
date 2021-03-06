import {HtmlElement} from 'cx/ui/HtmlElement';
import {List} from 'cx/ui/List';
import {Repeater} from 'cx/ui/Repeater';
import {Controller} from 'cx/ui/Controller';
import {Text} from 'cx/ui/Text';
import {Link} from 'cx/ui/nav/Link';
import {KeySelection} from 'cx/ui/selection/KeySelection';
import {Menu} from 'cx/ui/nav/Menu';
import {TreeAdapter} from 'cx/ui/grid/TreeAdapter';
import {History} from 'cx/app/History';
import {Url} from 'cx/app/Url';
import NavTree from './NavTree';
import {updateArray} from 'cx/data/ops/updateArray';
import {Glyph} from 'app/components/Glyph';

class CController extends Controller {
    init() {
        super.init();
        this.store.init('contents', NavTree);

        this.addTrigger('active-topic-expand', ['url'], (url) => {
            this.store.update('contents', updateArray, t => ({
                ...t,
                expanded: true
            }), t=>!t.expanded && t.articles.some(x=>url.indexOf(x.url) == 0))
        }, true);
    }
}

const onItemClick = (e, {store}) => {
    e.preventDefault();
    e.stopPropagation();
    var record = store.get('$topic');
    if (record.url)
        History.pushState({}, null, Url.resolve(record.url));
    else
        store.set('$topic.expanded', !record.expanded);
    return false;
};

export const SideNav = <cx>
    <List mod="sidenav"
          controller={CController}
          records:bind="contents"
          recordName="$topic"
          adapter={{type: TreeAdapter, childrenField: 'articles', expandedField: 'expanded'}}
          selection={{type: KeySelection, bind: 'url', keyField: 'url'}}
          onItemClick={onItemClick}>

        <div visible:expr="{$topic.$level} == 0" preserveWhitespace
             class={{
                 "csb-sidenavtopic": true,
                 "css-expanded": {expr: "{$topic.expanded}"},
                 "css-collapsed": {expr: "!{$topic.expanded}"}
             }}>

            <Text bind="$topic.topic"/>
            <i class="csb-cssicon-arrowleft" style="float:right"></i>
        </div>

        <Link visible:expr="{$topic.$level} > 0"
              href:bind="$topic.url"
              url:bind="url"
              match="prefix"
              mod="sidenav"
              tabIndex={-1}>
            <Glyph name:expr="{$topic.glyph} || 'file-text-o'" />
            <Text bind="$topic.title" />
        </Link>

    </List>
</cx>;
