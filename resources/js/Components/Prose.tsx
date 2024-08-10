import clsx from 'clsx'
import {Component} from "react";

export class Prose extends Component<{ children: any, className: any }> {
    render() {
        let {children, className: className} = this.props;
        return (
            <div className={clsx(className, 'prose dark:prose-invert')}>{children}</div>
        )
    }
}
