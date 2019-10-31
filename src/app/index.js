/**
 * WordPress dependencies
 */
import { Animate } from '@wordpress/components';
import { Component, createRef } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
/**
 * External dependencies
 */
import { HashRouter as Router } from 'react-router-dom';
/**
 * Internal dependencies
 */
import './store';
import './app.scss';

import {
	AppError,
	AppPrimaryNav
} from '@/components';

import { Main, Header } from '@/parts';

class App extends Component {
	constructor( props ) {
		super( props );
		// create refs for skip focus links
		this.navFocus = createRef();
		this.contentFocus = createRef();
		// make refs/this available in
		this.handleNavFocus = this.handleNavFocus.bind( this );
		this.handleContentFocus = this.handleContentFocus.bind( this );
		this.componentDidCatch = this.componentDidCatch.bind( this );
		this.state = {
			hasError: false,
			appError: null
		};

		dispatch('bluehost/plugin').fetchWindowData();
	}

	handleNavFocus(event) {
		event.preventDefault(); // no anchor jumps that done bork hash-routing
		this.navFocus.current.focus( { preventScroll: true } );
	}

	handleContentFocus(event) {
		event.preventDefault(); // no anchor jumps that done bork hash-routing
		this.contentFocus.current.focus( { preventScroll: true } );
	}

	componentDidCatch(error,info) {
		this.setState({ hasError: true, appError: error });
	}

	render() {
		if (true === this.state.hasError) {
			window.bhError = this.state.appError
			return (
				<div>
					<AppError />
				</div>
			);
		}
		return (
			<Animate type="appear" options={{ origin: 'center'}}>
				{
					({}) => (
						<Router>
							<div id="bluehost-app-wrap" className="bluehost-app-wrap">
								<a className="screen-reader-shortcut bluehost-spa-skip" href="#" onClick={ this.handleNavFocus } onKeyPress={ this.handleNavFocus }>
									{ __( 'Skip to Navigation', 'bluehost-wordpress-plugin' ) }
								</a>
								<a className="screen-reader-shortcut bluehost-spa-skip" href="#" onClick={ this.handleContentFocus } onKeyPress={ this.handleContentFocus }>
									{ __( 'Skip to Content', 'bluehost-wordpress-plugin' ) }
								</a>
								<div>
									<Header />
								</div>
								<div id="navigation" tabIndex="-1" ref={ this.navFocus }>
									<AppPrimaryNav />
								</div>
								<div tabIndex="-1" ref={ this.contentFocus }>
									<Main />
								</div>
							</div>
						</Router>
					)
				}
			</Animate>
		);
	}
}

export default App;
