const page = figma.root.children.find(p => p.name === 'Partner Dashboard');
if (!page) return { error: 'Partner Dashboard page not found' };
await figma.setCurrentPageAsync(page);

await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
// ─── HELPERS ───
function mf(colorVar) {
  var p = figma.util.solidPaint("#000000");
  p = figma.variables.setBoundVariableForPaint(p, "color", colorVar);
  return [p];
}

function appendFill(parent, child, fillH, fillV) {
  parent.appendChild(child);
  if (fillH) child.layoutSizingHorizontal = "FILL";
  if (fillV) child.layoutSizingVertical = "FILL";
}

function bindPadding(frame, top, right, bottom, left) {
  if (top) frame.setBoundVariable("paddingTop", top);
  if (right) frame.setBoundVariable("paddingRight", right);
  if (bottom) frame.setBoundVariable("paddingBottom", bottom);
  if (left) frame.setBoundVariable("paddingLeft", left);
}

function bindRadius(frame, radiusVar) {
  frame.setBoundVariable("topLeftRadius", radiusVar);
  frame.setBoundVariable("topRightRadius", radiusVar);
  frame.setBoundVariable("bottomLeftRadius", radiusVar);
  frame.setBoundVariable("bottomRightRadius", radiusVar);
}

function findPropKey(compSet, prefix, type) {
  var defs = compSet.componentPropertyDefinitions;
  return Object.keys(defs).find(function(k) {
    return k.startsWith(prefix) && defs[k].type === type;
  });
}
// ── PRELOAD ──

// ── IMPORTS ──
var var_color_neutral_50 = await figma.variables.importVariableByKeyAsync("d474c188340a40d6a702ec449ba8f1dc075959ed");
var var_color_primary_950 = await figma.variables.importVariableByKeyAsync("e92585da1a7223a9c691929a3ec0c90b8b5fc482");
var var_spacing_2 = await figma.variables.importVariableByKeyAsync("2f2f1e3744693d4a39191f903373b49d44acf244");
var var_spacing_6 = await figma.variables.importVariableByKeyAsync("0e542679a56efcf3ecba13d9ec26a3ac530cd1da");
var var_spacing_4 = await figma.variables.importVariableByKeyAsync("6e18f90a585d3f823089cd4ce7e0396e0987c630");
var var_color_primary_500 = await figma.variables.importVariableByKeyAsync("0b2761ebab1271cad9f685c6d3954ef8e78faec7");
var var_color_neutral_white = await figma.variables.importVariableByKeyAsync("4295e45038904a41db2d5034ff3c0af10c822fc7");
var var_spacing_1 = await figma.variables.importVariableByKeyAsync("2c509b9dab0df283398109711d8189751bbe761b");
var var_spacing_3 = await figma.variables.importVariableByKeyAsync("3e8c215392630e1c52ffb147ead1c88db91f4adb");
var var_color_semantic_success = await figma.variables.importVariableByKeyAsync("cab880942c4d8b77790c643b55a55b541c43576a");
var var_color_semantic_warning = await figma.variables.importVariableByKeyAsync("2e2c22d61422366e0e51217f94d58b313a2e7029");
var var_color_semantic_error = await figma.variables.importVariableByKeyAsync("e158f4ffad7d480a8385b883d7398812cc56b49f");
var var_spacing_8 = await figma.variables.importVariableByKeyAsync("2ac7fe5f62e90bd5d821b293279504f2eebfbbe3");
var var_color_neutral_900 = await figma.variables.importVariableByKeyAsync("5be8468bad2be4c9c9aebd9c1657d6ff3c456c25");
var var_color_neutral_500 = await figma.variables.importVariableByKeyAsync("580041f66563b84324efea5a6cf47db1769ee66e");
var var_color_neutral_400 = await figma.variables.importVariableByKeyAsync("cf1de86c0863b1599035d50d2f0dbabac8f4759f");
var var_color_neutral_600 = await figma.variables.importVariableByKeyAsync("d5c2c9c8ada6b9b88aa1eb65e1392f985e6eed11");
var var_color_primary_50 = await figma.variables.importVariableByKeyAsync("d618171197d5cd1557ce6bcad16f6de6a2d5cb70");
var style_text_label_lg_semibold = await figma.importStyleByKeyAsync("55530d839f84a97e42776c6f27eb1d2d78a1a809");
var style_text_label_sm_regular = await figma.importStyleByKeyAsync("97baf9ebce035b1b042a92f88288e369f0ab52ea");
var style_text_label_sm_medium = await figma.importStyleByKeyAsync("2df2643b36f14cc8953d349ae7454e310cf99efc");
var style_text_label_xs_regular = await figma.importStyleByKeyAsync("7b845dfc0df3a28c6a90ce7ccfb03e0228cf8e32");
var style_text_heading_2_semibold = await figma.importStyleByKeyAsync("d8cff896db14f4032676c86c2484265230267c67");
var style_text_body_md_regular = await figma.importStyleByKeyAsync("97c717422b498aeab704a7964e9f112b497da427");

// ── STORE ON BRIDGE ──

// ── ROOT FRAME ──
var root = figma.createFrame();
root.name = "Partner/Firm Home";
root.resize(1440, 900);
root.layoutMode = "VERTICAL";
root.primaryAxisSizingMode = "AUTO";
root.counterAxisSizingMode = "FIXED";
root.x = 0;
root.y = 0;
figma.currentPage.appendChild(root);



// ── NODES ──
var frame_partner_firm_home = figma.createFrame();
frame_partner_firm_home.name = "Partner/Firm Home";
frame_partner_firm_home.layoutMode = "HORIZONTAL";
frame_partner_firm_home.resize(1440, 900);
frame_partner_firm_home.fills = mf(var_color_neutral_50);
root.appendChild(frame_partner_firm_home);
var frame_sidebarfirm = figma.createFrame();
frame_sidebarfirm.name = "SidebarFirm";
frame_sidebarfirm.layoutMode = "VERTICAL";
frame_sidebarfirm.resize(240, 100);
frame_sidebarfirm.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_sidebarfirm, var_spacing_6, var_spacing_4, var_spacing_6, var_spacing_4);
frame_sidebarfirm.fills = mf(var_color_primary_950);
frame_partner_firm_home.appendChild(frame_sidebarfirm);
frame_sidebarfirm.layoutSizingVertical = "FILL";
var frame_logo = figma.createFrame();
frame_logo.name = "Logo";
frame_logo.layoutMode = "HORIZONTAL";
frame_logo.setBoundVariable('itemSpacing', var_spacing_2);
frame_sidebarfirm.appendChild(frame_logo);
var rect_logomark = figma.createRectangle();
rect_logomark.name = "LogoMark";
rect_logomark.resize(28, 28);
rect_logomark.fills = mf(var_color_primary_500);
frame_logo.appendChild(rect_logomark);

var text_logotext = figma.createText();
text_logotext.name = "LogoText";
text_logotext.characters = "Econos";
await text_logotext.setTextStyleIdAsync(style_text_label_lg_semibold.id);
text_logotext.fills = mf(var_color_neutral_white);
frame_logo.appendChild(text_logotext);
text_logotext.textAutoResize = "HEIGHT";


var frame_searchbar = figma.createFrame();
frame_searchbar.name = "SearchBar";
frame_searchbar.layoutMode = "HORIZONTAL";
frame_searchbar.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_searchbar, var_spacing_2, var_spacing_2, var_spacing_2, var_spacing_2);
frame_sidebarfirm.appendChild(frame_searchbar);
frame_searchbar.layoutSizingHorizontal = "FILL";
var rect_searchicon = figma.createRectangle();
rect_searchicon.name = "SearchIcon";
rect_searchicon.resize(14, 14);
frame_searchbar.appendChild(rect_searchicon);

var text_searchplaceholder = figma.createText();
text_searchplaceholder.name = "SearchPlaceholder";
text_searchplaceholder.characters = "Search clients, invoices...";
await text_searchplaceholder.setTextStyleIdAsync(style_text_label_sm_regular.id);
frame_searchbar.appendChild(text_searchplaceholder);
text_searchplaceholder.textAutoResize = "HEIGHT";


var frame_navdivider = figma.createFrame();
frame_navdivider.name = "NavDivider";
frame_navdivider.resize(100, 1);
frame_sidebarfirm.appendChild(frame_navdivider);
frame_navdivider.layoutSizingHorizontal = "FILL";

var frame_navitems = figma.createFrame();
frame_navitems.name = "NavItems";
frame_navitems.layoutMode = "VERTICAL";
frame_navitems.setBoundVariable('itemSpacing', var_spacing_1);
frame_sidebarfirm.appendChild(frame_navitems);
frame_navitems.layoutSizingHorizontal = "FILL";
var frame_navhome = figma.createFrame();
frame_navhome.name = "NavHome";
frame_navhome.layoutMode = "HORIZONTAL";
frame_navhome.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_navhome, var_spacing_2, var_spacing_3, var_spacing_2, var_spacing_3);
frame_navitems.appendChild(frame_navhome);
frame_navhome.layoutSizingHorizontal = "FILL";
var rect_activeborder = figma.createRectangle();
rect_activeborder.name = "ActiveBorder";
rect_activeborder.resize(3, 20);
rect_activeborder.fills = mf(var_color_primary_500);
frame_navhome.appendChild(rect_activeborder);

var text_navlabel = figma.createText();
text_navlabel.name = "NavLabel";
text_navlabel.characters = "Home";
await text_navlabel.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_navlabel.fills = mf(var_color_neutral_white);
frame_navhome.appendChild(text_navlabel);
text_navlabel.textAutoResize = "HEIGHT";


var frame_navclients = figma.createFrame();
frame_navclients.name = "NavClients";
frame_navclients.layoutMode = "HORIZONTAL";
frame_navclients.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_navclients, var_spacing_2, var_spacing_3, var_spacing_2, var_spacing_3);
frame_navitems.appendChild(frame_navclients);
frame_navclients.layoutSizingHorizontal = "FILL";
var text_navlabel_2 = figma.createText();
text_navlabel_2.name = "NavLabel";
text_navlabel_2.characters = "Clients";
await text_navlabel_2.setTextStyleIdAsync(style_text_label_sm_medium.id);
frame_navclients.appendChild(text_navlabel_2);
text_navlabel_2.textAutoResize = "HEIGHT";


var frame_navtasks = figma.createFrame();
frame_navtasks.name = "NavTasks";
frame_navtasks.layoutMode = "HORIZONTAL";
frame_navtasks.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_navtasks, var_spacing_2, var_spacing_3, var_spacing_2, var_spacing_3);
frame_navitems.appendChild(frame_navtasks);
frame_navtasks.layoutSizingHorizontal = "FILL";
var text_navlabel_3 = figma.createText();
text_navlabel_3.name = "NavLabel";
text_navlabel_3.characters = "Tasks";
await text_navlabel_3.setTextStyleIdAsync(style_text_label_sm_medium.id);
frame_navtasks.appendChild(text_navlabel_3);
text_navlabel_3.textAutoResize = "HEIGHT";


var frame_navinvoices = figma.createFrame();
frame_navinvoices.name = "NavInvoices";
frame_navinvoices.layoutMode = "HORIZONTAL";
frame_navinvoices.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_navinvoices, var_spacing_2, var_spacing_3, var_spacing_2, var_spacing_3);
frame_navitems.appendChild(frame_navinvoices);
frame_navinvoices.layoutSizingHorizontal = "FILL";
var text_navlabel_4 = figma.createText();
text_navlabel_4.name = "NavLabel";
text_navlabel_4.characters = "Invoices";
await text_navlabel_4.setTextStyleIdAsync(style_text_label_sm_medium.id);
frame_navinvoices.appendChild(text_navlabel_4);
text_navlabel_4.textAutoResize = "HEIGHT";


var frame_navreports = figma.createFrame();
frame_navreports.name = "NavReports";
frame_navreports.layoutMode = "HORIZONTAL";
frame_navreports.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_navreports, var_spacing_2, var_spacing_3, var_spacing_2, var_spacing_3);
frame_navitems.appendChild(frame_navreports);
frame_navreports.layoutSizingHorizontal = "FILL";
var text_navlabel_5 = figma.createText();
text_navlabel_5.name = "NavLabel";
text_navlabel_5.characters = "Reports";
await text_navlabel_5.setTextStyleIdAsync(style_text_label_sm_medium.id);
frame_navreports.appendChild(text_navlabel_5);
text_navlabel_5.textAutoResize = "HEIGHT";


var frame_navsettings = figma.createFrame();
frame_navsettings.name = "NavSettings";
frame_navsettings.layoutMode = "HORIZONTAL";
frame_navsettings.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_navsettings, var_spacing_2, var_spacing_3, var_spacing_2, var_spacing_3);
frame_navitems.appendChild(frame_navsettings);
frame_navsettings.layoutSizingHorizontal = "FILL";
var text_navlabel_6 = figma.createText();
text_navlabel_6.name = "NavLabel";
text_navlabel_6.characters = "Settings";
await text_navlabel_6.setTextStyleIdAsync(style_text_label_sm_medium.id);
frame_navsettings.appendChild(text_navlabel_6);
text_navlabel_6.textAutoResize = "HEIGHT";



var frame_navdivider2 = figma.createFrame();
frame_navdivider2.name = "NavDivider2";
frame_navdivider2.resize(100, 1);
frame_sidebarfirm.appendChild(frame_navdivider2);
frame_navdivider2.layoutSizingHorizontal = "FILL";

var frame_recentclients = figma.createFrame();
frame_recentclients.name = "RecentClients";
frame_recentclients.layoutMode = "VERTICAL";
frame_recentclients.setBoundVariable('itemSpacing', var_spacing_1);
frame_sidebarfirm.appendChild(frame_recentclients);
frame_recentclients.layoutSizingHorizontal = "FILL";
var text_recentlabel = figma.createText();
text_recentlabel.name = "RecentLabel";
text_recentlabel.characters = "RECENT";
await text_recentlabel.setTextStyleIdAsync(style_text_label_xs_regular.id);
frame_recentclients.appendChild(text_recentlabel);
text_recentlabel.textAutoResize = "HEIGHT";

var frame_recentclient1 = figma.createFrame();
frame_recentclient1.name = "RecentClient1";
frame_recentclient1.layoutMode = "HORIZONTAL";
frame_recentclient1.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_recentclient1, var_spacing_2, var_spacing_2, var_spacing_2, var_spacing_2);
frame_recentclients.appendChild(frame_recentclient1);
frame_recentclient1.layoutSizingHorizontal = "FILL";
var ellipse_healthdot = figma.createEllipse();
ellipse_healthdot.name = "HealthDot";
ellipse_healthdot.resize(8, 8);
ellipse_healthdot.fills = mf(var_color_semantic_success);
frame_recentclient1.appendChild(ellipse_healthdot);

var text_clientname = figma.createText();
text_clientname.name = "ClientName";
text_clientname.characters = "Virtanen Oy";
await text_clientname.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_clientname.fills = mf(var_color_neutral_white);
frame_recentclient1.appendChild(text_clientname);
text_clientname.textAutoResize = "HEIGHT";


var frame_recentclient2 = figma.createFrame();
frame_recentclient2.name = "RecentClient2";
frame_recentclient2.layoutMode = "HORIZONTAL";
frame_recentclient2.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_recentclient2, var_spacing_2, var_spacing_2, var_spacing_2, var_spacing_2);
frame_recentclients.appendChild(frame_recentclient2);
frame_recentclient2.layoutSizingHorizontal = "FILL";
var ellipse_healthdot_2 = figma.createEllipse();
ellipse_healthdot_2.name = "HealthDot";
ellipse_healthdot_2.resize(8, 8);
ellipse_healthdot_2.fills = mf(var_color_semantic_warning);
frame_recentclient2.appendChild(ellipse_healthdot_2);

var text_clientname_2 = figma.createText();
text_clientname_2.name = "ClientName";
text_clientname_2.characters = "Nordic Build Oy";
await text_clientname_2.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_clientname_2.fills = mf(var_color_neutral_white);
frame_recentclient2.appendChild(text_clientname_2);
text_clientname_2.textAutoResize = "HEIGHT";


var frame_recentclient3 = figma.createFrame();
frame_recentclient3.name = "RecentClient3";
frame_recentclient3.layoutMode = "HORIZONTAL";
frame_recentclient3.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_recentclient3, var_spacing_2, var_spacing_2, var_spacing_2, var_spacing_2);
frame_recentclients.appendChild(frame_recentclient3);
frame_recentclient3.layoutSizingHorizontal = "FILL";
var ellipse_healthdot_3 = figma.createEllipse();
ellipse_healthdot_3.name = "HealthDot";
ellipse_healthdot_3.resize(8, 8);
ellipse_healthdot_3.fills = mf(var_color_semantic_error);
frame_recentclient3.appendChild(ellipse_healthdot_3);

var text_clientname_3 = figma.createText();
text_clientname_3.name = "ClientName";
text_clientname_3.characters = "Koski & Co";
await text_clientname_3.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_clientname_3.fills = mf(var_color_neutral_white);
frame_recentclient3.appendChild(text_clientname_3);
text_clientname_3.textAutoResize = "HEIGHT";



var frame_spacer = figma.createFrame();
frame_spacer.name = "Spacer";
frame_spacer.layoutMode = "VERTICAL";
frame_sidebarfirm.appendChild(frame_spacer);
frame_spacer.layoutSizingVertical = "FILL";

var frame_bottomdivider = figma.createFrame();
frame_bottomdivider.name = "BottomDivider";
frame_bottomdivider.resize(100, 1);
frame_sidebarfirm.appendChild(frame_bottomdivider);
frame_bottomdivider.layoutSizingHorizontal = "FILL";

var frame_usersection = figma.createFrame();
frame_usersection.name = "UserSection";
frame_usersection.layoutMode = "VERTICAL";
frame_usersection.setBoundVariable('itemSpacing', var_spacing_1);
bindPadding(frame_usersection, var_spacing_2, var_spacing_1, var_spacing_1, var_spacing_1);
frame_sidebarfirm.appendChild(frame_usersection);
frame_usersection.layoutSizingHorizontal = "FILL";
var text_firmname = figma.createText();
text_firmname.name = "FirmName";
text_firmname.characters = "Protax Oy";
await text_firmname.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_firmname.fills = mf(var_color_neutral_white);
frame_usersection.appendChild(text_firmname);
text_firmname.textAutoResize = "HEIGHT";

var frame_userrow = figma.createFrame();
frame_userrow.name = "UserRow";
frame_userrow.layoutMode = "HORIZONTAL";
frame_userrow.setBoundVariable('itemSpacing', var_spacing_2);
frame_usersection.appendChild(frame_userrow);
frame_userrow.layoutSizingHorizontal = "FILL";
var ellipse_avatar = figma.createEllipse();
ellipse_avatar.name = "Avatar";
ellipse_avatar.resize(32, 32);
ellipse_avatar.fills = mf(var_color_primary_500);
frame_userrow.appendChild(ellipse_avatar);

var frame_userinfo = figma.createFrame();
frame_userinfo.name = "UserInfo";
frame_userinfo.layoutMode = "VERTICAL";
frame_userinfo.setBoundVariable('itemSpacing', var_spacing_1);
frame_userrow.appendChild(frame_userinfo);
var text_username = figma.createText();
text_username.name = "UserName";
text_username.characters = "Kirsti Makinen";
await text_username.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_username.fills = mf(var_color_neutral_white);
frame_userinfo.appendChild(text_username);
text_username.textAutoResize = "HEIGHT";

var text_userrole = figma.createText();
text_userrole.name = "UserRole";
text_userrole.characters = "Firm Admin";
await text_userrole.setTextStyleIdAsync(style_text_label_xs_regular.id);
frame_userinfo.appendChild(text_userrole);
text_userrole.textAutoResize = "HEIGHT";





var frame_maincontent = figma.createFrame();
frame_maincontent.name = "MainContent";
frame_maincontent.layoutMode = "VERTICAL";
frame_maincontent.setBoundVariable('itemSpacing', var_spacing_6);
bindPadding(frame_maincontent, var_spacing_8, var_spacing_8, var_spacing_8, var_spacing_8);
frame_maincontent.fills = mf(var_color_neutral_50);
frame_partner_firm_home.appendChild(frame_maincontent);
frame_maincontent.layoutSizingHorizontal = "FILL";
frame_maincontent.layoutSizingVertical = "FILL";
var frame_header = figma.createFrame();
frame_header.name = "Header";
frame_header.layoutMode = "HORIZONTAL";
frame_maincontent.appendChild(frame_header);
frame_header.layoutSizingHorizontal = "FILL";
var frame_headerleft = figma.createFrame();
frame_headerleft.name = "HeaderLeft";
frame_headerleft.layoutMode = "VERTICAL";
frame_headerleft.setBoundVariable('itemSpacing', var_spacing_1);
frame_header.appendChild(frame_headerleft);
frame_headerleft.layoutSizingHorizontal = "FILL";
var text_greeting = figma.createText();
text_greeting.name = "Greeting";
text_greeting.characters = "Good morning, Kirsti.";
await text_greeting.setTextStyleIdAsync(style_text_heading_2_semibold.id);
text_greeting.fills = mf(var_color_neutral_900);
frame_headerleft.appendChild(text_greeting);
text_greeting.textAutoResize = "HEIGHT";

var text_subtitle = figma.createText();
text_subtitle.name = "Subtitle";
text_subtitle.characters = "12 items need your attention today";
await text_subtitle.setTextStyleIdAsync(style_text_body_md_regular.id);
text_subtitle.fills = mf(var_color_neutral_500);
frame_headerleft.appendChild(text_subtitle);
text_subtitle.textAutoResize = "HEIGHT";


var frame_notificationbell = figma.createFrame();
frame_notificationbell.name = "NotificationBell";
frame_notificationbell.layoutMode = "HORIZONTAL";
frame_notificationbell.resize(40, 40);
frame_notificationbell.fills = mf(var_color_neutral_white);
frame_header.appendChild(frame_notificationbell);
var text_bellicon = figma.createText();
text_bellicon.name = "BellIcon";
text_bellicon.characters = "Bell";
await text_bellicon.setTextStyleIdAsync(style_text_label_sm_regular.id);
text_bellicon.fills = mf(var_color_neutral_500);
frame_notificationbell.appendChild(text_bellicon);
text_bellicon.textAutoResize = "HEIGHT";



var frame_kpistrip = figma.createFrame();
frame_kpistrip.name = "KPIStrip";
frame_kpistrip.layoutMode = "HORIZONTAL";
frame_kpistrip.setBoundVariable('itemSpacing', var_spacing_4);
frame_maincontent.appendChild(frame_kpistrip);
frame_kpistrip.layoutSizingHorizontal = "FILL";
var frame_kpi_activeclients = figma.createFrame();
frame_kpi_activeclients.name = "KPI-ActiveClients";
frame_kpi_activeclients.layoutMode = "VERTICAL";
frame_kpi_activeclients.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_kpi_activeclients, var_spacing_4, var_spacing_6, var_spacing_4, var_spacing_4);
frame_kpi_activeclients.fills = mf(var_color_neutral_white);
frame_kpistrip.appendChild(frame_kpi_activeclients);
frame_kpi_activeclients.layoutSizingHorizontal = "FILL";
var text_kpilabel = figma.createText();
text_kpilabel.name = "KPILabel";
text_kpilabel.characters = "Active Clients";
await text_kpilabel.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_kpilabel.fills = mf(var_color_neutral_500);
frame_kpi_activeclients.appendChild(text_kpilabel);
text_kpilabel.textAutoResize = "HEIGHT";

var text_kpivalue = figma.createText();
text_kpivalue.name = "KPIValue";
text_kpivalue.characters = "34";
await text_kpivalue.setTextStyleIdAsync(style_text_heading_2_semibold.id);
text_kpivalue.fills = mf(var_color_neutral_900);
frame_kpi_activeclients.appendChild(text_kpivalue);
text_kpivalue.textAutoResize = "HEIGHT";

var text_kpitrend = figma.createText();
text_kpitrend.name = "KPITrend";
text_kpitrend.characters = "2 this month";
await text_kpitrend.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_kpitrend.fills = mf(var_color_semantic_success);
frame_kpi_activeclients.appendChild(text_kpitrend);
text_kpitrend.textAutoResize = "HEIGHT";


var frame_kpi_pendingactions = figma.createFrame();
frame_kpi_pendingactions.name = "KPI-PendingActions";
frame_kpi_pendingactions.layoutMode = "VERTICAL";
frame_kpi_pendingactions.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_kpi_pendingactions, var_spacing_4, var_spacing_6, var_spacing_4, var_spacing_4);
frame_kpi_pendingactions.fills = mf(var_color_neutral_white);
frame_kpistrip.appendChild(frame_kpi_pendingactions);
frame_kpi_pendingactions.layoutSizingHorizontal = "FILL";
var text_kpilabel_2 = figma.createText();
text_kpilabel_2.name = "KPILabel";
text_kpilabel_2.characters = "Pending Actions";
await text_kpilabel_2.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_kpilabel_2.fills = mf(var_color_neutral_500);
frame_kpi_pendingactions.appendChild(text_kpilabel_2);
text_kpilabel_2.textAutoResize = "HEIGHT";

var text_kpivalue_2 = figma.createText();
text_kpivalue_2.name = "KPIValue";
text_kpivalue_2.characters = "12";
await text_kpivalue_2.setTextStyleIdAsync(style_text_heading_2_semibold.id);
text_kpivalue_2.fills = mf(var_color_neutral_900);
frame_kpi_pendingactions.appendChild(text_kpivalue_2);
text_kpivalue_2.textAutoResize = "HEIGHT";

var text_kpitrend_2 = figma.createText();
text_kpitrend_2.name = "KPITrend";
text_kpitrend_2.characters = "3 from yesterday";
await text_kpitrend_2.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_kpitrend_2.fills = mf(var_color_semantic_success);
frame_kpi_pendingactions.appendChild(text_kpitrend_2);
text_kpitrend_2.textAutoResize = "HEIGHT";


var frame_kpi_vatdeadlines = figma.createFrame();
frame_kpi_vatdeadlines.name = "KPI-VATDeadlines";
frame_kpi_vatdeadlines.layoutMode = "VERTICAL";
frame_kpi_vatdeadlines.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_kpi_vatdeadlines, var_spacing_4, var_spacing_6, var_spacing_4, var_spacing_4);
frame_kpi_vatdeadlines.fills = mf(var_color_neutral_white);
frame_kpistrip.appendChild(frame_kpi_vatdeadlines);
frame_kpi_vatdeadlines.layoutSizingHorizontal = "FILL";
var text_kpilabel_3 = figma.createText();
text_kpilabel_3.name = "KPILabel";
text_kpilabel_3.characters = "VAT Deadlines (7 days)";
await text_kpilabel_3.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_kpilabel_3.fills = mf(var_color_neutral_500);
frame_kpi_vatdeadlines.appendChild(text_kpilabel_3);
text_kpilabel_3.textAutoResize = "HEIGHT";

var text_kpivalue_3 = figma.createText();
text_kpivalue_3.name = "KPIValue";
text_kpivalue_3.characters = "3";
await text_kpivalue_3.setTextStyleIdAsync(style_text_heading_2_semibold.id);
text_kpivalue_3.fills = mf(var_color_semantic_error);
frame_kpi_vatdeadlines.appendChild(text_kpivalue_3);
text_kpivalue_3.textAutoResize = "HEIGHT";

var text_kpitrend_3 = figma.createText();
text_kpitrend_3.name = "KPITrend";
text_kpitrend_3.characters = "Needs attention";
await text_kpitrend_3.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_kpitrend_3.fills = mf(var_color_semantic_error);
frame_kpi_vatdeadlines.appendChild(text_kpitrend_3);
text_kpitrend_3.textAutoResize = "HEIGHT";


var frame_kpi_unreconciled = figma.createFrame();
frame_kpi_unreconciled.name = "KPI-Unreconciled";
frame_kpi_unreconciled.layoutMode = "VERTICAL";
frame_kpi_unreconciled.setBoundVariable('itemSpacing', var_spacing_2);
bindPadding(frame_kpi_unreconciled, var_spacing_4, var_spacing_6, var_spacing_4, var_spacing_4);
frame_kpi_unreconciled.fills = mf(var_color_neutral_white);
frame_kpistrip.appendChild(frame_kpi_unreconciled);
frame_kpi_unreconciled.layoutSizingHorizontal = "FILL";
var text_kpilabel_4 = figma.createText();
text_kpilabel_4.name = "KPILabel";
text_kpilabel_4.characters = "Unreconciled Statements";
await text_kpilabel_4.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_kpilabel_4.fills = mf(var_color_neutral_500);
frame_kpi_unreconciled.appendChild(text_kpilabel_4);
text_kpilabel_4.textAutoResize = "HEIGHT";

var text_kpivalue_4 = figma.createText();
text_kpivalue_4.name = "KPIValue";
text_kpivalue_4.characters = "7";
await text_kpivalue_4.setTextStyleIdAsync(style_text_heading_2_semibold.id);
text_kpivalue_4.fills = mf(var_color_neutral_900);
frame_kpi_unreconciled.appendChild(text_kpivalue_4);
text_kpivalue_4.textAutoResize = "HEIGHT";

var text_kpitrend_4 = figma.createText();
text_kpitrend_4.name = "KPITrend";
text_kpitrend_4.characters = "2 from yesterday";
await text_kpitrend_4.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_kpitrend_4.fills = mf(var_color_semantic_error);
frame_kpi_unreconciled.appendChild(text_kpitrend_4);
text_kpitrend_4.textAutoResize = "HEIGHT";



var frame_twocolumn = figma.createFrame();
frame_twocolumn.name = "TwoColumn";
frame_twocolumn.layoutMode = "HORIZONTAL";
frame_twocolumn.setBoundVariable('itemSpacing', var_spacing_6);
frame_maincontent.appendChild(frame_twocolumn);
frame_twocolumn.layoutSizingHorizontal = "FILL";
frame_twocolumn.layoutSizingVertical = "FILL";
var frame_clientgrid = figma.createFrame();
frame_clientgrid.name = "ClientGrid";
frame_clientgrid.layoutMode = "VERTICAL";
frame_clientgrid.setBoundVariable('itemSpacing', var_spacing_4);
bindPadding(frame_clientgrid, var_spacing_4, var_spacing_6, var_spacing_4, var_spacing_6);
frame_clientgrid.fills = mf(var_color_neutral_white);
frame_twocolumn.appendChild(frame_clientgrid);
frame_clientgrid.layoutSizingHorizontal = "FILL";
frame_clientgrid.layoutSizingVertical = "FILL";
var frame_gridheader = figma.createFrame();
frame_gridheader.name = "GridHeader";
frame_gridheader.layoutMode = "HORIZONTAL";
frame_clientgrid.appendChild(frame_gridheader);
frame_gridheader.layoutSizingHorizontal = "FILL";
var text_gridtitle = figma.createText();
text_gridtitle.name = "GridTitle";
text_gridtitle.characters = "All Clients";
await text_gridtitle.setTextStyleIdAsync(style_text_label_lg_semibold.id);
text_gridtitle.fills = mf(var_color_neutral_900);
frame_gridheader.appendChild(text_gridtitle);
text_gridtitle.layoutSizingHorizontal = "FILL";
text_gridtitle.textAutoResize = "HEIGHT";


var frame_tableheader = figma.createFrame();
frame_tableheader.name = "TableHeader";
frame_tableheader.layoutMode = "HORIZONTAL";
bindPadding(frame_tableheader, var_spacing_2, var_spacing_1, var_spacing_2, var_spacing_1);
frame_clientgrid.appendChild(frame_tableheader);
frame_tableheader.layoutSizingHorizontal = "FILL";
var text_colcompany = figma.createText();
text_colcompany.name = "ColCompany";
text_colcompany.characters = "Company";
await text_colcompany.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_colcompany.fills = mf(var_color_neutral_400);
frame_tableheader.appendChild(text_colcompany);
text_colcompany.textAutoResize = "HEIGHT";

var text_colhealth = figma.createText();
text_colhealth.name = "ColHealth";
text_colhealth.characters = "Health";
await text_colhealth.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_colhealth.fills = mf(var_color_neutral_400);
frame_tableheader.appendChild(text_colhealth);
text_colhealth.textAutoResize = "HEIGHT";

var text_colaccountant = figma.createText();
text_colaccountant.name = "ColAccountant";
text_colaccountant.characters = "Accountant";
await text_colaccountant.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_colaccountant.fills = mf(var_color_neutral_400);
frame_tableheader.appendChild(text_colaccountant);
text_colaccountant.textAutoResize = "HEIGHT";

var text_colpending = figma.createText();
text_colpending.name = "ColPending";
text_colpending.characters = "Pending";
await text_colpending.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_colpending.fills = mf(var_color_neutral_400);
frame_tableheader.appendChild(text_colpending);
text_colpending.textAutoResize = "HEIGHT";

var text_colactivity = figma.createText();
text_colactivity.name = "ColActivity";
text_colactivity.characters = "Last activity";
await text_colactivity.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_colactivity.fills = mf(var_color_neutral_400);
frame_tableheader.appendChild(text_colactivity);
text_colactivity.layoutSizingHorizontal = "FILL";
text_colactivity.textAutoResize = "HEIGHT";


var frame_clientrow1 = figma.createFrame();
frame_clientrow1.name = "ClientRow1";
frame_clientrow1.layoutMode = "HORIZONTAL";
bindPadding(frame_clientrow1, var_spacing_3, var_spacing_1, var_spacing_3, var_spacing_1);
frame_clientgrid.appendChild(frame_clientrow1);
frame_clientrow1.layoutSizingHorizontal = "FILL";
var frame_companycell = figma.createFrame();
frame_companycell.name = "CompanyCell";
frame_companycell.layoutMode = "VERTICAL";
frame_companycell.resize(200, 100);
frame_companycell.setBoundVariable('itemSpacing', var_spacing_1);
frame_clientrow1.appendChild(frame_companycell);
var text_companyname = figma.createText();
text_companyname.name = "CompanyName";
text_companyname.characters = "Koski and Co Oy";
await text_companyname.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_companyname.fills = mf(var_color_neutral_900);
frame_companycell.appendChild(text_companyname);
text_companyname.textAutoResize = "HEIGHT";

var text_ytunnus = figma.createText();
text_ytunnus.name = "YTunnus";
text_ytunnus.characters = "7654321-0";
await text_ytunnus.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_ytunnus.fills = mf(var_color_neutral_400);
frame_companycell.appendChild(text_ytunnus);
text_ytunnus.textAutoResize = "HEIGHT";


var frame_healthcell = figma.createFrame();
frame_healthcell.name = "HealthCell";
frame_healthcell.layoutMode = "HORIZONTAL";
frame_healthcell.resize(160, 100);
frame_healthcell.setBoundVariable('itemSpacing', var_spacing_2);
frame_clientrow1.appendChild(frame_healthcell);
var ellipse_healthdot_4 = figma.createEllipse();
ellipse_healthdot_4.name = "HealthDot";
ellipse_healthdot_4.resize(8, 8);
ellipse_healthdot_4.fills = mf(var_color_semantic_error);
frame_healthcell.appendChild(ellipse_healthdot_4);

var text_healthreason = figma.createText();
text_healthreason.name = "HealthReason";
text_healthreason.characters = "VAT overdue";
await text_healthreason.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_healthreason.fills = mf(var_color_neutral_500);
frame_healthcell.appendChild(text_healthreason);
text_healthreason.textAutoResize = "HEIGHT";


var text_accountantcell = figma.createText();
text_accountantcell.name = "AccountantCell";
text_accountantcell.characters = "Pekka M.";
await text_accountantcell.setTextStyleIdAsync(style_text_label_sm_regular.id);
text_accountantcell.fills = mf(var_color_neutral_600);
frame_clientrow1.appendChild(text_accountantcell);
text_accountantcell.textAutoResize = "HEIGHT";

var frame_pendingcell = figma.createFrame();
frame_pendingcell.name = "PendingCell";
frame_pendingcell.layoutMode = "HORIZONTAL";
frame_pendingcell.resize(80, 100);
frame_clientrow1.appendChild(frame_pendingcell);
var frame_badge = figma.createFrame();
frame_badge.name = "Badge";
frame_badge.layoutMode = "HORIZONTAL";
bindPadding(frame_badge, var_spacing_1, var_spacing_2, var_spacing_1, var_spacing_2);
frame_badge.fills = mf(var_color_semantic_error);
frame_pendingcell.appendChild(frame_badge);
var text_badgecount = figma.createText();
text_badgecount.name = "BadgeCount";
text_badgecount.characters = "5";
await text_badgecount.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_badgecount.fills = mf(var_color_neutral_white);
frame_badge.appendChild(text_badgecount);
text_badgecount.textAutoResize = "HEIGHT";



var text_activitycell = figma.createText();
text_activitycell.name = "ActivityCell";
text_activitycell.characters = "2 hours ago";
await text_activitycell.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_activitycell.fills = mf(var_color_neutral_400);
frame_clientrow1.appendChild(text_activitycell);
text_activitycell.layoutSizingHorizontal = "FILL";
text_activitycell.textAutoResize = "HEIGHT";


var frame_clientrow2 = figma.createFrame();
frame_clientrow2.name = "ClientRow2";
frame_clientrow2.layoutMode = "HORIZONTAL";
bindPadding(frame_clientrow2, var_spacing_3, var_spacing_1, var_spacing_3, var_spacing_1);
frame_clientgrid.appendChild(frame_clientrow2);
frame_clientrow2.layoutSizingHorizontal = "FILL";
var frame_companycell_2 = figma.createFrame();
frame_companycell_2.name = "CompanyCell";
frame_companycell_2.layoutMode = "VERTICAL";
frame_companycell_2.resize(200, 100);
frame_companycell_2.setBoundVariable('itemSpacing', var_spacing_1);
frame_clientrow2.appendChild(frame_companycell_2);
var text_companyname_2 = figma.createText();
text_companyname_2.name = "CompanyName";
text_companyname_2.characters = "Nordic Build Oy";
await text_companyname_2.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_companyname_2.fills = mf(var_color_neutral_900);
frame_companycell_2.appendChild(text_companyname_2);
text_companyname_2.textAutoResize = "HEIGHT";

var text_ytunnus_2 = figma.createText();
text_ytunnus_2.name = "YTunnus";
text_ytunnus_2.characters = "2345678-9";
await text_ytunnus_2.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_ytunnus_2.fills = mf(var_color_neutral_400);
frame_companycell_2.appendChild(text_ytunnus_2);
text_ytunnus_2.textAutoResize = "HEIGHT";


var frame_healthcell_2 = figma.createFrame();
frame_healthcell_2.name = "HealthCell";
frame_healthcell_2.layoutMode = "HORIZONTAL";
frame_healthcell_2.resize(160, 100);
frame_healthcell_2.setBoundVariable('itemSpacing', var_spacing_2);
frame_clientrow2.appendChild(frame_healthcell_2);
var ellipse_healthdot_5 = figma.createEllipse();
ellipse_healthdot_5.name = "HealthDot";
ellipse_healthdot_5.resize(8, 8);
ellipse_healthdot_5.fills = mf(var_color_semantic_warning);
frame_healthcell_2.appendChild(ellipse_healthdot_5);

var text_healthreason_2 = figma.createText();
text_healthreason_2.name = "HealthReason";
text_healthreason_2.characters = "Bank unreconciled";
await text_healthreason_2.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_healthreason_2.fills = mf(var_color_neutral_500);
frame_healthcell_2.appendChild(text_healthreason_2);
text_healthreason_2.textAutoResize = "HEIGHT";


var text_accountantcell_2 = figma.createText();
text_accountantcell_2.name = "AccountantCell";
text_accountantcell_2.characters = "Kirsti M.";
await text_accountantcell_2.setTextStyleIdAsync(style_text_label_sm_regular.id);
text_accountantcell_2.fills = mf(var_color_neutral_600);
frame_clientrow2.appendChild(text_accountantcell_2);
text_accountantcell_2.textAutoResize = "HEIGHT";

var frame_pendingcell_2 = figma.createFrame();
frame_pendingcell_2.name = "PendingCell";
frame_pendingcell_2.layoutMode = "HORIZONTAL";
frame_pendingcell_2.resize(80, 100);
frame_clientrow2.appendChild(frame_pendingcell_2);
var frame_badge_2 = figma.createFrame();
frame_badge_2.name = "Badge";
frame_badge_2.layoutMode = "HORIZONTAL";
bindPadding(frame_badge_2, var_spacing_1, var_spacing_2, var_spacing_1, var_spacing_2);
frame_badge_2.fills = mf(var_color_semantic_warning);
frame_pendingcell_2.appendChild(frame_badge_2);
var text_badgecount_2 = figma.createText();
text_badgecount_2.name = "BadgeCount";
text_badgecount_2.characters = "2";
await text_badgecount_2.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_badgecount_2.fills = mf(var_color_neutral_white);
frame_badge_2.appendChild(text_badgecount_2);
text_badgecount_2.textAutoResize = "HEIGHT";



var text_activitycell_2 = figma.createText();
text_activitycell_2.name = "ActivityCell";
text_activitycell_2.characters = "Yesterday";
await text_activitycell_2.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_activitycell_2.fills = mf(var_color_neutral_400);
frame_clientrow2.appendChild(text_activitycell_2);
text_activitycell_2.layoutSizingHorizontal = "FILL";
text_activitycell_2.textAutoResize = "HEIGHT";


var frame_clientrow3 = figma.createFrame();
frame_clientrow3.name = "ClientRow3";
frame_clientrow3.layoutMode = "HORIZONTAL";
bindPadding(frame_clientrow3, var_spacing_3, var_spacing_1, var_spacing_3, var_spacing_1);
frame_clientgrid.appendChild(frame_clientrow3);
frame_clientrow3.layoutSizingHorizontal = "FILL";
var frame_companycell_3 = figma.createFrame();
frame_companycell_3.name = "CompanyCell";
frame_companycell_3.layoutMode = "VERTICAL";
frame_companycell_3.resize(200, 100);
frame_companycell_3.setBoundVariable('itemSpacing', var_spacing_1);
frame_clientrow3.appendChild(frame_companycell_3);
var text_companyname_3 = figma.createText();
text_companyname_3.name = "CompanyName";
text_companyname_3.characters = "Virtanen Oy";
await text_companyname_3.setTextStyleIdAsync(style_text_label_sm_medium.id);
text_companyname_3.fills = mf(var_color_neutral_900);
frame_companycell_3.appendChild(text_companyname_3);
text_companyname_3.textAutoResize = "HEIGHT";

var text_ytunnus_3 = figma.createText();
text_ytunnus_3.name = "YTunnus";
text_ytunnus_3.characters = "1234567-8";
await text_ytunnus_3.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_ytunnus_3.fills = mf(var_color_neutral_400);
frame_companycell_3.appendChild(text_ytunnus_3);
text_ytunnus_3.textAutoResize = "HEIGHT";


var frame_healthcell_3 = figma.createFrame();
frame_healthcell_3.name = "HealthCell";
frame_healthcell_3.layoutMode = "HORIZONTAL";
frame_healthcell_3.resize(160, 100);
frame_healthcell_3.setBoundVariable('itemSpacing', var_spacing_2);
frame_clientrow3.appendChild(frame_healthcell_3);
var ellipse_healthdot_6 = figma.createEllipse();
ellipse_healthdot_6.name = "HealthDot";
ellipse_healthdot_6.resize(8, 8);
ellipse_healthdot_6.fills = mf(var_color_semantic_success);
frame_healthcell_3.appendChild(ellipse_healthdot_6);

var text_healthreason_3 = figma.createText();
text_healthreason_3.name = "HealthReason";
text_healthreason_3.characters = "All clear";
await text_healthreason_3.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_healthreason_3.fills = mf(var_color_neutral_500);
frame_healthcell_3.appendChild(text_healthreason_3);
text_healthreason_3.textAutoResize = "HEIGHT";


var text_accountantcell_3 = figma.createText();
text_accountantcell_3.name = "AccountantCell";
text_accountantcell_3.characters = "Pekka M.";
await text_accountantcell_3.setTextStyleIdAsync(style_text_label_sm_regular.id);
text_accountantcell_3.fills = mf(var_color_neutral_600);
frame_clientrow3.appendChild(text_accountantcell_3);
text_accountantcell_3.textAutoResize = "HEIGHT";

var text_pendingcell = figma.createText();
text_pendingcell.name = "PendingCell";
text_pendingcell.characters = "No pending";
await text_pendingcell.setTextStyleIdAsync(style_text_label_sm_regular.id);
text_pendingcell.fills = mf(var_color_neutral_400);
frame_clientrow3.appendChild(text_pendingcell);
text_pendingcell.textAutoResize = "HEIGHT";

var text_activitycell_3 = figma.createText();
text_activitycell_3.name = "ActivityCell";
text_activitycell_3.characters = "3 days ago";
await text_activitycell_3.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_activitycell_3.fills = mf(var_color_neutral_400);
frame_clientrow3.appendChild(text_activitycell_3);
text_activitycell_3.layoutSizingHorizontal = "FILL";
text_activitycell_3.textAutoResize = "HEIGHT";



var frame_priorityfeed = figma.createFrame();
frame_priorityfeed.name = "PriorityFeed";
frame_priorityfeed.layoutMode = "VERTICAL";
frame_priorityfeed.resize(320, 100);
frame_priorityfeed.setBoundVariable('itemSpacing', var_spacing_4);
bindPadding(frame_priorityfeed, var_spacing_4, var_spacing_6, var_spacing_4, var_spacing_6);
frame_priorityfeed.fills = mf(var_color_neutral_white);
frame_twocolumn.appendChild(frame_priorityfeed);
frame_priorityfeed.layoutSizingVertical = "FILL";
var text_feedtitle = figma.createText();
text_feedtitle.name = "FeedTitle";
text_feedtitle.characters = "Priority Feed";
await text_feedtitle.setTextStyleIdAsync(style_text_label_lg_semibold.id);
text_feedtitle.fills = mf(var_color_neutral_900);
frame_priorityfeed.appendChild(text_feedtitle);
text_feedtitle.textAutoResize = "HEIGHT";

var text_overduelabel = figma.createText();
text_overduelabel.name = "OverdueLabel";
text_overduelabel.characters = "OVERDUE";
await text_overduelabel.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_overduelabel.fills = mf(var_color_semantic_error);
frame_priorityfeed.appendChild(text_overduelabel);
text_overduelabel.textAutoResize = "HEIGHT";

var frame_feeditem1 = figma.createFrame();
frame_feeditem1.name = "FeedItem1";
frame_feeditem1.layoutMode = "VERTICAL";
frame_feeditem1.setBoundVariable('itemSpacing', var_spacing_1);
bindPadding(frame_feeditem1, var_spacing_3, var_spacing_1, var_spacing_3, var_spacing_1);
frame_priorityfeed.appendChild(frame_feeditem1);
frame_feeditem1.layoutSizingHorizontal = "FILL";
var frame_clientpill = figma.createFrame();
frame_clientpill.name = "ClientPill";
frame_clientpill.layoutMode = "HORIZONTAL";
bindPadding(frame_clientpill, var_spacing_1, var_spacing_2, var_spacing_1, var_spacing_2);
frame_clientpill.fills = mf(var_color_primary_50);
frame_feeditem1.appendChild(frame_clientpill);
var text_pilllabel = figma.createText();
text_pilllabel.name = "PillLabel";
text_pilllabel.characters = "Koski and Co";
await text_pilllabel.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_pilllabel.fills = mf(var_color_primary_500);
frame_clientpill.appendChild(text_pilllabel);
text_pilllabel.textAutoResize = "HEIGHT";


var text_actiontext = figma.createText();
text_actiontext.name = "ActionText";
text_actiontext.characters = "VAT return overdue - file immediately";
await text_actiontext.setTextStyleIdAsync(style_text_label_sm_regular.id);
text_actiontext.fills = mf(var_color_neutral_900);
frame_feeditem1.appendChild(text_actiontext);
text_actiontext.textAutoResize = "HEIGHT";

var text_duedate = figma.createText();
text_duedate.name = "DueDate";
text_duedate.characters = "Was due Apr 25";
await text_duedate.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_duedate.fills = mf(var_color_semantic_error);
frame_feeditem1.appendChild(text_duedate);
text_duedate.textAutoResize = "HEIGHT";


var text_todaylabel = figma.createText();
text_todaylabel.name = "TodayLabel";
text_todaylabel.characters = "DUE TODAY";
await text_todaylabel.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_todaylabel.fills = mf(var_color_semantic_warning);
frame_priorityfeed.appendChild(text_todaylabel);
text_todaylabel.textAutoResize = "HEIGHT";

var frame_feeditem2 = figma.createFrame();
frame_feeditem2.name = "FeedItem2";
frame_feeditem2.layoutMode = "VERTICAL";
frame_feeditem2.setBoundVariable('itemSpacing', var_spacing_1);
bindPadding(frame_feeditem2, var_spacing_3, var_spacing_1, var_spacing_3, var_spacing_1);
frame_priorityfeed.appendChild(frame_feeditem2);
frame_feeditem2.layoutSizingHorizontal = "FILL";
var frame_clientpill_2 = figma.createFrame();
frame_clientpill_2.name = "ClientPill";
frame_clientpill_2.layoutMode = "HORIZONTAL";
bindPadding(frame_clientpill_2, var_spacing_1, var_spacing_2, var_spacing_1, var_spacing_2);
frame_clientpill_2.fills = mf(var_color_primary_50);
frame_feeditem2.appendChild(frame_clientpill_2);
var text_pilllabel_2 = figma.createText();
text_pilllabel_2.name = "PillLabel";
text_pilllabel_2.characters = "Nordic Build";
await text_pilllabel_2.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_pilllabel_2.fills = mf(var_color_primary_500);
frame_clientpill_2.appendChild(text_pilllabel_2);
text_pilllabel_2.textAutoResize = "HEIGHT";


var text_actiontext_2 = figma.createText();
text_actiontext_2.name = "ActionText";
text_actiontext_2.characters = "Reconcile April bank statement";
await text_actiontext_2.setTextStyleIdAsync(style_text_label_sm_regular.id);
text_actiontext_2.fills = mf(var_color_neutral_900);
frame_feeditem2.appendChild(text_actiontext_2);
text_actiontext_2.textAutoResize = "HEIGHT";

var text_duedate_2 = figma.createText();
text_duedate_2.name = "DueDate";
text_duedate_2.characters = "Due today";
await text_duedate_2.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_duedate_2.fills = mf(var_color_semantic_warning);
frame_feeditem2.appendChild(text_duedate_2);
text_duedate_2.textAutoResize = "HEIGHT";


var text_weeklabel = figma.createText();
text_weeklabel.name = "WeekLabel";
text_weeklabel.characters = "DUE THIS WEEK";
await text_weeklabel.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_weeklabel.fills = mf(var_color_neutral_400);
frame_priorityfeed.appendChild(text_weeklabel);
text_weeklabel.textAutoResize = "HEIGHT";

var frame_feeditem3 = figma.createFrame();
frame_feeditem3.name = "FeedItem3";
frame_feeditem3.layoutMode = "VERTICAL";
frame_feeditem3.setBoundVariable('itemSpacing', var_spacing_1);
bindPadding(frame_feeditem3, var_spacing_3, var_spacing_1, var_spacing_3, var_spacing_1);
frame_priorityfeed.appendChild(frame_feeditem3);
frame_feeditem3.layoutSizingHorizontal = "FILL";
var frame_clientpill_3 = figma.createFrame();
frame_clientpill_3.name = "ClientPill";
frame_clientpill_3.layoutMode = "HORIZONTAL";
bindPadding(frame_clientpill_3, var_spacing_1, var_spacing_2, var_spacing_1, var_spacing_2);
frame_clientpill_3.fills = mf(var_color_primary_50);
frame_feeditem3.appendChild(frame_clientpill_3);
var text_pilllabel_3 = figma.createText();
text_pilllabel_3.name = "PillLabel";
text_pilllabel_3.characters = "Virtanen Oy";
await text_pilllabel_3.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_pilllabel_3.fills = mf(var_color_primary_500);
frame_clientpill_3.appendChild(text_pilllabel_3);
text_pilllabel_3.textAutoResize = "HEIGHT";


var text_actiontext_3 = figma.createText();
text_actiontext_3.name = "ActionText";
text_actiontext_3.characters = "Q1 financial report to client";
await text_actiontext_3.setTextStyleIdAsync(style_text_label_sm_regular.id);
text_actiontext_3.fills = mf(var_color_neutral_900);
frame_feeditem3.appendChild(text_actiontext_3);
text_actiontext_3.textAutoResize = "HEIGHT";

var text_duedate_3 = figma.createText();
text_duedate_3.name = "DueDate";
text_duedate_3.characters = "Due Apr 30";
await text_duedate_3.setTextStyleIdAsync(style_text_label_xs_regular.id);
text_duedate_3.fills = mf(var_color_neutral_400);
frame_feeditem3.appendChild(text_duedate_3);
text_duedate_3.textAutoResize = "HEIGHT";






return { success: true, rootId: root.id };