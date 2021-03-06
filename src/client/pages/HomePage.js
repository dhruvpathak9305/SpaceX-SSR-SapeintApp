/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types"; // ES6
import { fetchMissions } from "../actions";
import MissionCard from "../components/MissionCard";
import FilterSection from "../components/FilterSection";

import Sidebar from "../components/Sidebar";
import LaunchesList from "../components/LaunchesList";

import { useLocation, useHistory } from "react-router-dom";
import dataUtils from "../utils/dataUtils";
// 44444444444444444444444444444444444444444444444444444

const HomePage = (props) => {
  const [modal, setModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});
  const [launch, setLaunch] = useState("");
  const [year, setYear] = useState("");
  const [landing, setLanding] = useState("");

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const fetchFilteredLaunches = async () => {
      await props.fetchMissions(location.search);
      setLoading(false);
    };

    fetchFilteredLaunches();
  }, [location.search]);

  const handleUpdateSearchString = (searchString) => {
    setLoading(true);
    history.push(searchString);
    // console.log(searchString);
  };

  // const readArticle = (project) => {
  //   setCurrentArticle(project);
  //   setModal(true);
  // };

  // const closeModal = () => {
  //   setModal(false);
  // };
  // const handleYearFilter = (e) => {
  //   setYear(e);
  // };
  // const handleLaunchFilter = (e) => {
  //   setLaunch(e);
  // };
  // const handleLandingFilter = (e) => {
  //   setLanding(e);
  // };

  // const setFilterData = (year, landing, launch) => {
  //   let source = {};
  //   source = year ? { ...source, launch_year: year } : source;
  //   source = launch ? { ...source, launch_success: launch } : source;
  //   source = landing ? { ...source, land_success: landing } : source;
  //   props.fetchMissions(source);
  // };

  // const renderMissions = () => {
  //   return props.spaceXdata.length > 0 ? (
  //     props.spaceXdata.map((project) => (
  //       <div
  //         className="col-12 col-md-6 col-lg-3"
  //         key={`${project.mission_name}_${project.flight_number}`}
  //       >
  //         <MissionCard project={project} />
  //       </div>
  //     ))
  //   ) : (
  //     <h1>No data found with specific filter</h1>
  //   );
  // };

  // const renderFilter = () => {
  //   return (
  //     <div className="bg-white p-2 mb-2">
  //       <h5 className="text-bold text-left">Filters</h5>
  //       <FilterSection
  //         handleClick={handleYearFilter}
  //         filterName="Launch Year"
  //         filterValues={yearFilter}
  //       />
  //       <FilterSection
  //         handleClick={handleLaunchFilter}
  //         filterName="Successful Launch"
  //         filterValues={launchFilter}
  //       />
  //       <FilterSection
  //         handleClick={handleLandingFilter}
  //         filterName="Successful Landing"
  //         filterValues={launchFilter}
  //       />
  //     </div>
  //   );
  // };

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>SpaceX - missions</title>
        <meta property="og:title" content="SpaceX - missions" />
        <meta name="description" content="latest spaceXdata missions" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://react-ssr-ilker.herokuapp.com" />
      </Helmet>
    );
  };

  // const { fetchMissions: loadArticles } = props;

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   loadArticles();
  // }, [loadArticles]);

  // useEffect(() => {
  //   setFilterData(year, landing, launch);
  // }, [year, landing, launch]);

  // let launchFilter = ["True", "False"];

  // let yearFilter = [
  //   2006,
  //   2007,
  //   2008,
  //   2009,
  //   2010,
  //   2011,
  //   2012,
  //   2013,
  //   2014,
  //   2015,
  //   2016,
  //   2017,
  //   2018,
  //   2019,
  //   2020,
  // ];

  return (
    <div>
      {head()}
      <div className="row">
        <div className="section">
          <h2 className="pl-2 font-weight-bold ">
            SpaceX Launch Programs
          </h2>
        </div>
        <div className="divider" />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3 col-lg-2">
              <Sidebar updateSearchString={handleUpdateSearchString} />
            </div>
            <div className="col-12 col-md-9 col-lg-10">
              <div className="row">
                <LaunchesList loading={loading} launches={props.spaceXdata} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    spaceXdata: state.spaceXdata,
  };
};

const loadData = (store) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchMissions()); // Manually dispatch a network request
};

// HomePage.propTypes = {
//   spaceXdata: PropTypes.arrayOf(PropTypes.any),
//   fetchMissions: PropTypes.func,
// };

// HomePage.defaultProps = {
//   spaceXdata: [],
//   fetchMissions: null,
// };

export default {
  component: connect(mapStateToProps, { fetchMissions })(HomePage),
  loadData,
};
