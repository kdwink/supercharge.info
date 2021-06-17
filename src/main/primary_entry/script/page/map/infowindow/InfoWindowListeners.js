import $ from "jquery";
import Events from "../../../util/Events";
import Sites from "../../../site/Sites";
import EventBus from "../../../util/EventBus";
import MapEvents from "../MapEvents";
import Analytics from "../../../util/Analytics";
import RouteEvents from "../route/RouteEvents";
import RoutingWaypoint from "../route/RoutingWaypoint";

function toSupercharger(event) {
    const eventDetail = Events.eventDetail(event);
    const id = parseInt(eventDetail.actionName);
    return Sites.getById(id);
}

class InfoWindowListeners {

    constructor() {
        $(document).on('click', '.details-trigger', (event) => {
            const supercharger = toSupercharger(event);
            const infoWindow = supercharger.marker.infoWindow;

            infoWindow.toggleNearby(false);
            infoWindow.toggleHistory(false);
            infoWindow.toggleDetails();
            infoWindow.redraw();

        });

        $(document).on('click', '.history-trigger', (event) => {
            const supercharger = toSupercharger(event);
            const infoWindow = supercharger.marker.infoWindow;

            infoWindow.toggleNearby(false);
            infoWindow.toggleDetails(false);
            infoWindow.toggleHistory();
            infoWindow.redraw();

        });

        $(document).on('click', '.pin-marker-trigger', (event) => {
            const supercharger = toSupercharger(event);
            const infoWindow = supercharger.marker.infoWindow;
            infoWindow.togglePin();
        });

        $(document).on('click', '.zoom-to-site-trigger', (event) => {
            const supercharger = toSupercharger(event);
            EventBus.dispatch(MapEvents.pan_zoom, {latLng: supercharger.location, zoom: 15})
        });

        $(document).on('click', '.circle-toggle-trigger', (event) => {
            const eventDetail = Events.eventDetail(event);
            const supercharger = toSupercharger(event);

            if (supercharger.circle) {
                eventDetail.link.text("circle on");
                Analytics.sendEvent("map", "turn-off-single-circle");
            } else {
                eventDetail.link.text("circle off");
                Analytics.sendEvent("map", "turn-on-single-circle");
            }
            EventBus.dispatch(MapEvents.toggle_circle, supercharger);
        });

        $(document).on('click', '.add-to-route-trigger', (event) => {
            const supercharger = toSupercharger(event);
            EventBus.dispatch(RouteEvents.add_waypoint, new RoutingWaypoint(supercharger.location, supercharger.displayName));
            Analytics.sendEvent("route", "add-marker-to-route", "pop up");
        });

        // TODO: nearby $(document).on('click', '.nearby-trigger', $.proxy(this.handleNearbySearch, this));

    }






}

export default new InfoWindowListeners();
