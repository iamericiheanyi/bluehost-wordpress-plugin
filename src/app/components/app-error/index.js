import {__} from '@wordpress/i18n';
import {withState} from '@wordpress/compose';
import { select } from '@wordpress/data';
import axios from 'axios';
import qs from 'qs';

import {AppButton as Button} from '@/components';
import {ReactComponent as WarningIcon} from '@/assets/warning.svg';
import {ReactComponent as ErrorStateIllustration} from '@/assets/error-state.svg';

import './style.scss';

const AppError = withState({
    errorReported: false,
    appError: null
})(({errorReported, appError, setState}) => {
    const reportErrorToWP = () => {
        console.log( 'do the error report' );
        axios.post( 
            location.origin + '/wp-json/bluehost/v1/error/track', 
            qs.stringify({
                date: new Date(), 
                message: window.bhError.message,
                wpUser: window.userSettings.uid ? window.userSettings.uid : 'Unknown'
            })
        ).then((response) => {
            console.log( 'in then' );
            console.dir(response);
            setState({ errorReported: true });
        }).catch((httpErr) => {
            console.log( 'in catch' );
            console.dir(httpErr);
        }).finally(() => {
            console.log( 'doing finally' );
        });
    };

    reportErrorToWP();

    return (
        <div id="app-error">
            <div className="warning-icon-wrap">
                <WarningIcon className="animated heartBeat"/>
            </div>
            <h3 className="animated fadeIn">{__('There was a problem loading the Bluehost Plugin.', 'bluehost-wordpress-plugin')}</h3>
            <p className="animated fadeIn">{__('Get in touch and we\'ll sort out the issue for you.', 'bluehost-wordpress-plugin')}</p>
            <div className="animated fadeIn" style={{textAlign: 'center', margin: '1rem auto 80px'}}>
                <Button href="https://bluehost.com/support" isPrimary>{__('Contact Support', 'bluehost-wordpress-plugin')}</Button>
            </div>
            <p>{!errorReported && __('Reporting...', 'bluehost-wordpress-plugin') || __('Reported.', 'bluehost-wordpress-plugin')}</p>
            <div className="error-illustration-wrap animated fadeIn">
                <ErrorStateIllustration/>
            </div>
        </div>
    );
});

export default AppError;