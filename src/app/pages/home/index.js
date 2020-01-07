/**
 * Project dependencies
 */
import { BWABaseTemplate } from '@/components/templates';
/**
 * Component dependencies
 */
import './style.scss';
import Welcome from './welcome';
import ComingSoonNotice from './coming-soon-notice';
import ContentSection from './content';
import DesignBuildSection from './design-build';
import TrafficEngagementSection from './traffic-engagement';
import PerformanceSection from './performance';
import HostingSection from './hosting';

const Home = () => (
	<BWABaseTemplate className="page-home">
		<div className="page-home__container">
			<Welcome />
			<ComingSoonNotice />
			<ContentSection />
			<DesignBuildSection />
			<TrafficEngagementSection />
			<PerformanceSection />
			<HostingSection />
		</div>
	</BWABaseTemplate>
);

export default Home;
