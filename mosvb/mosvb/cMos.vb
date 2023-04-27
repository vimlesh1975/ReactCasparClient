Imports System.Xml.Serialization

Namespace mosprotocol
    <XmlRoot("mos")>
    Public Class cMOS
        Private _mosID, _ncsID, _pageName, _type As String
        Private _messageID, _layerNumber As Long
        Private _heartbeat As cHeartBeat
        Private _dataList As List(Of cData)

        Public Property mosID As String
            Get
                Return _mosID
            End Get
            Set(ByVal value As String)
                _mosID = value
            End Set
        End Property
        Public Property type As String
            Get
                Return _type
            End Get
            Set(ByVal value As String)
                _type = value
            End Set
        End Property
        Public Property ncsID As String
            Get
                Return _ncsID
            End Get
            Set(ByVal value As String)
                _ncsID = value
            End Set
        End Property

        Public Property pageName As String
            Get
                Return _pageName
            End Get
            Set(ByVal value As String)
                _pageName = value
            End Set
        End Property

        Public Property layerNumber As Long
            Get
                Return _layerNumber
            End Get
            Set(ByVal value As Long)
                _layerNumber = value
            End Set
        End Property

        Public Property messageID As Long
            Get
                Return _messageID
            End Get
            Set(ByVal value As Long)
                _messageID = value
            End Set
        End Property

        Public Property heartbeat As cHeartBeat
            Get
                Return _heartbeat
            End Get
            Set(ByVal value As cHeartBeat)
                _heartbeat = value
            End Set
        End Property

        Public Property dataList As List(Of cData)
            Get
                Return _dataList
            End Get
            Set(ByVal value As List(Of cData))
                _dataList = value
            End Set
        End Property
    End Class

    Public Class cData
        Public Property key As String
        Public Property value As String
        Public Property type As String
    End Class
End Namespace
