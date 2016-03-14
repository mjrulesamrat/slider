"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from .utils import render_template, load_resource, resource_string

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String, List
from xblock.fragment import Fragment

from .utils import loader

class SliderXBlock(XBlock):
    """
    Updated by: Jay Modi
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # slider_name and slider_description added
    display_name = String(
        default="LYNX Slider XBlock", scope=Scope.settings,
        help="Slider Display name"
    )

    slider_data = List(
        default=[],
        scope=Scope.settings,
        help="Animation",
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the SliderXBlock, shown to students
        when viewing courses.
        """
        '''html = self.resource_string("static/html/slider.html")

        self.banner = banner_url

        frag = Fragment(html.format(self=self))'''

        # print dir(self.runtime.local_resource_url(self, 'public/img/'))

        banner_url = self.runtime.local_resource_url(self,
                                                     'public/img/banner01.jpg')

        context = {
            'self': self,
            'banner': banner_url,
        }

        frag = Fragment()
        frag.add_content(loader.render_template('/static/html/slider.html', context))
        frag.add_css(self.resource_string("/static/css/slider.css"))
        frag.add_css(self.resource_string("/static/css/bjqs.css"))
        frag.add_css(self.resource_string("/static/css/demo.css"))
        frag.add_javascript(self.resource_string("/static/js/src/slider.js"))
        frag.add_javascript(self.resource_string("/static/js/src/bjqs-1.3.js"))
        frag.initialize_js('SliderXBlock')
        return frag

    def studio_view(self, context=None):
        """
        The studio view
        """
        banner_url = self.runtime.local_resource_url(self,
                                                     'public/img/banner01.jpg')

        fragment = Fragment()
        content = {
            'self': self,
           'banner': banner_url,
        }
        # Load Studio View
        fragment.add_content(render_template('static/html/slider_edit.html', content))
        fragment.add_css(load_resource('static/css/slider_edit.css'))
        fragment.add_javascript(unicode(render_template('static/js/src/jquery.MultiFile.js', content)))
        fragment.add_javascript(unicode(render_template('static/js/src/slider_edit.js', content)))
        fragment.initialize_js('SliderXBlockStudio')

        return fragment

    # Added by Jay Modi
    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        """
        Course author pressed the Save button in Studio
        """
        result = {"submitted": "false", "saved": "false", "message": "", "preview": ""}

        if len(data) > 0:
            self.slider_name = data["silder_display_name"]
            self.slider_description = data["slider_description"]
            self.slider_data = data["slider_data"]
            result["submitted"] = "true"
            result["saved"] = "true"

        return result

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("SliderXBlock",
             """<slider/>
             """),
        ]
