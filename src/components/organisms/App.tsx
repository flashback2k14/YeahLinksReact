import * as React from "react";
import {
  IData,
  ICategory,
  ILink,
  IFetchError,
  IFetchResult,
  FetchResult,
  FetchError,
  Helper
} from "../../data";
import { CategoryList, CategoryItem, LinkList } from "../atoms";
import { ErrorLog, LinkItem, Loading, Search } from "../molecules";
import { GlobalStyles } from "./GlobalStyles";

interface IAppProps {
  dataSource: string;
}

interface IAppState {
  isLoading: boolean;
  fetchError: IFetchError;
  fetchResult: IFetchResult;
  showChildListForCategoryIds: number[];
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      isLoading: true,
      showChildListForCategoryIds: [],
      fetchResult: FetchResult.create({} as IData),
      fetchError: FetchError.create(false, new Error())
    };
  }

  async componentDidMount() {
    await this._fetchData();
  }

  render() {
    const {
      isLoading,
      fetchError,
      fetchResult,
      showChildListForCategoryIds
    } = this.state;

    return isLoading ? (
      <>
        <GlobalStyles />
        <Loading />
      </>
    ) : fetchError.hasErrors ? (
      <>
        <GlobalStyles />
        <ErrorLog fetchError={fetchError} />
      </>
    ) : (
      <React.Fragment>
        <GlobalStyles />
        <Search
          onInputChange={this._filterData}
          onClearFilter={this._clearFilterData}
        />
        <CategoryList>
          {fetchResult.data.categories.map((category: ICategory) => (
            <React.Fragment key={category.id}>
              <CategoryItem onClick={() => this._toggleChildList(category)}>
                {category.name}
              </CategoryItem>
              <li>
                <LinkList>
                  {this._getLinkList(category.id).map((link: ILink) => (
                    <LinkItem
                      key={link.id}
                      link={link}
                      isHidden={Helper.contains(
                        showChildListForCategoryIds,
                        link.categoryId
                      )}
                    />
                  ))}
                </LinkList>
              </li>
            </React.Fragment>
          ))}
        </CategoryList>
      </React.Fragment>
    );
  }

  private _fetchData = async (): Promise<void> => {
    try {
      const result: IData = await Helper.fetchfromJson(this.props.dataSource);
      this.setState({
        isLoading: false,
        fetchResult: FetchResult.create(result)
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        fetchError: FetchError.create(true, error)
      });
    }
  };

  private _filterData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { categories, links } = this.state.fetchResult.initialData;

    const filteredLinkLinks = links.filter(
      (link: ILink) =>
        -1 !== link.link.toUpperCase().search(e.target.value.toUpperCase())
    );

    const filteredLinkDescs = links.filter(
      (link: ILink) =>
        -1 !== link.desc.toUpperCase().search(e.target.value.toUpperCase())
    );

    const filteredLinks = Array.from(
      new Set([...filteredLinkLinks, ...filteredLinkDescs])
    );

    const filteredCategories = categories.filter(
      (category: ICategory) =>
        -1 !==
        filteredLinks.findIndex(
          (link: ILink) => link.categoryId === category.id
        )
    );

    this.setState({
      fetchResult: this.state.fetchResult.setData({
        categories: filteredCategories,
        links: filteredLinks
      }),
      showChildListForCategoryIds:
        e.target.value === ""
          ? []
          : filteredCategories.map((category: ICategory) => category.id)
    });
  };

  private _clearFilterData = (): void => {
    this.setState((prevState: IAppState) => {
      const { fetchResult } = prevState;
      return {
        fetchResult: fetchResult.setData(fetchResult.initialData),
        showChildListForCategoryIds: []
      };
    });
  };

  private _toggleChildList = (category: ICategory): void => {
    const { showChildListForCategoryIds } = this.state;
    const idx = Helper.findIndex(showChildListForCategoryIds, category.id);
    this.setState({
      showChildListForCategoryIds:
        idx !== -1
          ? Helper.immutableSplice(showChildListForCategoryIds, idx, 1)
          : Helper.immutablePush(showChildListForCategoryIds, category.id)
    });
  };

  private _getLinkList = (categoryId: number): ILink[] =>
    this.state.fetchResult.data.links
      .filter((link: ILink) => link.categoryId === categoryId)
      .sort(Helper.sortLinks);
}

export default App;
