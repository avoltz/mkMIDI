{
  // this allows sections to contain certain widgets
  Section.add_class('section', Section, []);
  Section.add_class('combo', Combo, ['labels', 'values', 'title']);

  // buttons
  Section.add_class('grp_btn', GroupButton, ['size']);
  Section.add_class('saw_btn', SawtoothButton, ['height', 'width']);
  Section.add_class('sq_btn', SquareButton, ['height', 'width']);
  Section.add_class('tri_btn', TriangleButton, ['height', 'width']);
}
