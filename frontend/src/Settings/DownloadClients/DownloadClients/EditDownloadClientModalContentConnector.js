import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createSelector } from 'reselect';
import createProviderSettingsSelector from 'Store/Selectors/createProviderSettingsSelector';
import { setDownloadClientValue, setDownloadClientFieldValue, saveDownloadClient, testDownloadClient } from 'Store/Actions/settingsActions';
import connectSection from 'Store/connectSection';
import EditDownloadClientModalContent from './EditDownloadClientModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    createProviderSettingsSelector(),
    (advancedSettings, downloadClient) => {
      return {
        advancedSettings,
        ...downloadClient
      };
    }
  );
}

const mapDispatchToProps = {
  setDownloadClientValue,
  setDownloadClientFieldValue,
  saveDownloadClient,
  testDownloadClient
};

class EditDownloadClientModalContentConnector extends Component {

  //
  // Lifecycle

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isSaving && !this.props.isSaving && !this.props.saveError) {
      this.props.onModalClose();
    }
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setDownloadClientValue({ name, value });
  }

  onFieldChange = ({ name, value }) => {
    this.props.setDownloadClientFieldValue({ name, value });
  }

  onSavePress = () => {
    this.props.saveDownloadClient({ id: this.props.id });
  }

  onTestPress = () => {
    this.props.testDownloadClient({ id: this.props.id });
  }

  //
  // Render

  render() {
    return (
      <EditDownloadClientModalContent
        {...this.props}
        onSavePress={this.onSavePress}
        onTestPress={this.onTestPress}
        onInputChange={this.onInputChange}
        onFieldChange={this.onFieldChange}
      />
    );
  }
}

EditDownloadClientModalContentConnector.propTypes = {
  id: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  setDownloadClientValue: PropTypes.func.isRequired,
  setDownloadClientFieldValue: PropTypes.func.isRequired,
  saveDownloadClient: PropTypes.func.isRequired,
  testDownloadClient: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connectSection(
  createMapStateToProps,
  mapDispatchToProps,
  undefined,
  undefined,
  { section: 'downloadClients' }
)(EditDownloadClientModalContentConnector);