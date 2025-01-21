// HOCs/withBreakpoint.js
import React from "react";

const withBreakpoint = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      breakpoint: this.getBreakpoint(),
    };

    componentDidMount() {
      window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }

    handleResize = () => {
      this.setState({ breakpoint: this.getBreakpoint() });
    };

    getBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) return "mobile";
      if (width < 1024) return "tablet";
      return "desktop";
    };

    render() {
      const { breakpoint } = this.state;
      const breakpointProps = {
        isMobile: breakpoint === "mobile",
        isTablet: breakpoint === "tablet",
        isDesktop: breakpoint === "desktop",
      };
      return <WrappedComponent {...this.props} {...breakpointProps} />;
    }
  };
};

export default withBreakpoint;
