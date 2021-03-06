import * as React from "react";
import {
  SearchContainer,
  SearchInputLabel,
  SearchInput,
  SearchButtonContainer,
  SearchButton,
  SearchButtonIcon
} from "../atoms";

interface ISearchProps {
  onClearFilter: Function;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ISearchState {
  isInputVisible: boolean;
}

export class Search extends React.Component<ISearchProps, ISearchState> {
  private _refTxtInput: HTMLInputElement | undefined;

  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      isInputVisible: false
    };
  }

  render() {
    return (
      <SearchContainer>
        <SearchInputLabel isVisible={this.state.isInputVisible}>
          Search
        </SearchInputLabel>
        <SearchInput
          ref={(ref: HTMLInputElement) => (this._refTxtInput = ref)}
          isVisible={this.state.isInputVisible}
          onChange={this.props.onInputChange}
          onKeyDown={this._handleKeydown}
        />
        <SearchButtonContainer hasFullWidth={!this.state.isInputVisible}>
          <SearchButton onClick={this._toggle}>
            <SearchButtonIcon />
          </SearchButton>
        </SearchButtonContainer>
      </SearchContainer>
    );
  }

  private _toggle = () => {
    this.setState(
      (prevState: ISearchState) => {
        return {
          isInputVisible: !prevState.isInputVisible
        };
      },
      () => {
        if (this._refTxtInput && this.state.isInputVisible) {
          this._refTxtInput.focus();
        } else {
          if (this._refTxtInput) {
            this._refTxtInput.value = "";
            this.props.onClearFilter();
          }
        }
      }
    );
  };

  private _handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which === 27) {
      this._toggle();
    }
  };
}
