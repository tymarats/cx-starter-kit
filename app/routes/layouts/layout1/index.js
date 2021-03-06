import {HtmlElement} from 'cx/ui/HtmlElement';
import {Controller} from 'cx/ui/Controller';
import {Button} from 'cx/ui/Button';
import {Text} from 'cx/ui/Text';
import {Link} from 'cx/ui/nav/Link';
import {MessageLayout} from 'app/layouts/MessageLayout';
import {AppLayout} from 'app/layouts/AppLayout';
import {Md} from 'app/components/Md';

import {selectLayout} from 'app/layouts/dynamicLayout'

export default <cx>
    <Md outerLayout={AppLayout} class="content-pad">
        ### Layout 1

        This layout is used for ...

        <div preserveWhitespace>
            <Button onClick={ e=>{ selectLayout('layout1') }} disabled:expr="{layout}=='layout1'">Keep it</Button>
            <Text visible:expr="{layout}=='layout1'" value="This is the currently selected layout." />
        </div>
    </Md>
</cx>

