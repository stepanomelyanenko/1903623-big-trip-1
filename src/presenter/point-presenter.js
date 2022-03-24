import PointItemView from '../view/point-item-view';
import PointEditView from '../view/point-edit-view';
import {render, RenderPosition, replace} from '../utils/render';

export default class PointPresenter {
  #tripPointsListElement = null;

  #pointItemComponent = null;
  #pointEditComponent = null;

  #tripPoint = null;

  constructor(tripPointsListElement) {
    this.#tripPointsListElement = tripPointsListElement;
  }

  init = (tripPoint) => {
    this.#tripPoint = tripPoint;

    this.#pointItemComponent =  new PointItemView(tripPoint);
    this.#pointEditComponent = new PointEditView(tripPoint);

    this.#pointItemComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setRollupClickHandler(this.#handleRollupClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    render(this.#tripPointsListElement, this.#pointItemComponent, RenderPosition.BEFOREEND);
  }

  #replaceItemToForm = () => {
    replace(this.#pointEditComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToItem = () => {
    replace(this.#pointItemComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToItem();
    }
  };

  #handleEditClick = () => {
    this.#replaceItemToForm();
  };

  #handleRollupClick = () => {
    this.#replaceFormToItem();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToItem();
  };
}

