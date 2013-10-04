define([ 'dojo/_base/declare',
         'dojo/_base/array',
         'JBrowse/View/Export',
         'JBrowse/Util'
       ],
       function( declare, array, ExportBase, Util ) {

return declare( ExportBase,

 /**
  * @lends JBrowse.View.Export.FASTA.prototype
  */
{

    /**
     * Data export driver for FASTA format.
     * @constructs
     */
    constructor: function( args ) {
    },

    // will need to override this if you're not exporting regular features
    exportRegion: function( region ) {
        var thisB = this;
        return this.store.getReferenceSequence( region.get('seq_id'), region.get('start'), region.get('end') )
            .then( function ( seq ) {
                       return thisB._formatFASTA( region, seq );
                    });
    },

    _formatFASTA: function( region, seq ) {
        return '>' + this.refSeq.get('seq_id')
            +' '+Util.assembleLocString(region) + "\n"
            + this._wrap( seq, 78 );
    },

    _wrap: function( string, length ) {
        length = length || 78;
        return string.replace( new RegExp('(.{'+length+'})','g'), "$1\n" );
    }
});
});

