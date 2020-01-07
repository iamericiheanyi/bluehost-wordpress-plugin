/**
 * WordPress dependencies
 */
import { Speak } from '@wordpress/a11y';
import { select, dispatch } from '@wordpress/data';
import { Component, useEffect } from '@wordpress/element';
/**
 * External dependencies
 */
import { useLocation } from 'react-router-dom';
import { chain, isString, replace, kebabCase, isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import './style.scss';

const BWABaseNewTemplate = (props) => {
	const location = useLocation();
	useEffect(() => {
		let getPageSlug = ( location ) => {
			return replace( replace( replace( location.pathname, '/marketplace', '' ), '/tools', '' ), '/', '' );
		};
		let data = {
			...location,
			pathnameKebab: kebabCase( location.pathname ),
			isTopLevel: select('bluehost/plugin').getAppPages().includes(getPageSlug(location)),
			slug: getPageSlug( location ),
			slugKebab: getPageSlug( location ),
		};
	}, [location]);
	// console.log('its dat data friend');
	// console.log(data)
	return (
		<section
			tabIndex="-1"
			// ref={ ( container ) => ( this.container = container ) }
			// className={ 'base-template animated fadeIn page-fade-speed ' + this.props.className }
			className={ 'base-template animated fadeIn page-fade-speed' }
		>
			{ props.children }
		</section>
	);
};

class BWABaseTemplate extends Component {
	componentDidMount() {
		// recieve this.props.state.setFocus
		this.handleContainerFocus();
		// if ( ! isEmpty( select('bluehost/plugin').getAppPages() ) && currentLocation.isTopLevel ) {
		this.handleWordPressMenuActive( currentLocation );
		// } else {
		// 	this.removeActivePageClasses();
		// 	this.hideSubPages();
		// }
	}

	handleContainerFocus() {
		const { location } = this.props;
		if ( location.state && location.state.setFocus ) {
			this.container.focus( { preventScroll: true } );
		}
	}

	handleWordPressMenuActive( location ) {
		try {
			const liToActivate = document.querySelector( '.bluehost-wp-menu-item.' + location.slug );
			const bluehostWpSubMenuNode = document.querySelector( '#toplevel_page_bluehost ul' );
			if ( liToActivate && bluehostWpSubMenuNode ) {
				// dispatch('bluehost/plugin').setActivePage( location.slug, location.isTopLevel );
				this.removeActivePageClasses();
				liToActivate.classList.add( 'current' );
				bluehostWpSubMenuNode.style = 'display: block;';
			}
		} catch ( e ) {
			console.error( e.message );
		}
	}

	removeActivePageClasses() {
		const bluehostWpMenuNodes = document.querySelectorAll( '#toplevel_page_bluehost .bluehost-wp-menu-item' );
		const bluehostWpMenuItems = Array.from( bluehostWpMenuNodes );
		bluehostWpMenuItems.forEach( function( li ) {
			li.classList.remove( 'current' );
		} );
	}

	render() {
		return (
			<section
				tabIndex="-1"
				ref={ ( container ) => ( this.container = container ) }
				className={ 'base-template animated fadeIn page-fade-speed ' + this.props.className }
            >
				{ this.props.children }
			</section>
		);
	}
}

export default BWABaseNewTemplate;
