import styled from 'styled-components';

const H3Container = ({ className, children }) => {
	return <h3 className={className}>{children}</h3>;
};

export const H3 = styled(H3Container)`
	text-align: center;
`;
